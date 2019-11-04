from sklearn.metrics.pairwise import cosine_similarity
import pandas as pd
from sklearn.cluster import KMeans
from sklearn.cluster import AgglomerativeClustering
import scipy.cluster.hierarchy as sch
import sqlite3
con = sqlite3.connect('./db.sqlite3')
ratings = pd.read_sql_query("SELECT * FROM api_rating",con)
movies = pd.read_sql_query("SELECT * FROM api_movie",con)
ratings.columns = ["id","rating","timestamp","movieId","userId"]
movies.columns = ["movieId","title","genre","average_rating","total_rate","view_cnt","poster_url","summary_id"]
movies = movies.drop(['title',"average_rating","total_rate","view_cnt","poster_url","summary_id"], axis=1)
movies = pd.merge(movies,ratings,how='left',on='movieId')
movies = movies.drop(['timestamp'], axis=1)
s1 = movies.genre.str.split('|', expand=True).stack().str.strip().reset_index(level=1, drop=True)
s2 = movies.genre.str.split('|', expand=True).stack().str.strip().reset_index(level=1, drop=True)
s3 = movies.genre.str.split('|', expand=True).stack().str.strip().reset_index(level=1, drop=True)
df1 = pd.concat([s1,s2,s3], axis=1, keys=['genre'])
new = pd.merge(movies, df1,left_index=True, right_index=True,how='left')
new = new.drop(['genre_x'], axis=1)
new.rename({'genre_y': 'genre'}, axis=1, inplace=True)
NEW = new.groupby(['userId', 'genre']).mean().round(1)
NEW = NEW.drop(['movieId'], axis=1)
NEW = NEW.fillna(0)
p = NEW.pivot_table("rating", index=["userId"], columns=['genre']).fillna(0)
cosine_rating = cosine_similarity(p)
kmeans = KMeans(n_clusters=5).fit(cosine_rating)
test = pd.DataFrame(kmeans.labels_)
test.rename({0: 'Kmeans'}, axis=1, inplace=True)
print(test)

dendrogram = sch.dendrogram(sch.linkage(cosine_rating, method='ward'))
model = AgglomerativeClustering(n_clusters=5, affinity='euclidean', linkage='ward')
model.fit(cosine_rating)
labels = model.labels_
my_df = pd.DataFrame(data=labels, columns=['Hierarchical'])
print(my_df)

TEST = pd.merge(test,my_df,how='outer', left_index=True, right_index=True)
# TEST.to_sql('userClustering', con)