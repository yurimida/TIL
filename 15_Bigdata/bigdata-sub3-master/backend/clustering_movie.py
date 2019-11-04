import matplotlib
import matplotlib.pyplot as plt
from sklearn.metrics.pairwise import cosine_similarity
import pandas as pd
from sklearn.cluster import KMeans
from sklearn.cluster import AgglomerativeClustering
from sklearn.mixture import GaussianMixture
import scipy.cluster.hierarchy as sch
import sqlite3

con = sqlite3.connect('./db.sqlite3')
ratings = pd.read_sql_query("SELECT * FROM api_rating",con)
ratings.columns = ["id","rating","timestamp","movieId","userId"]
ratings = ratings.fillna(0)
p = ratings.pivot_table(values='rating', index='movieId', columns='userId', fill_value=0)
p = p.values
cosine_rating = cosine_similarity(p)
kmeans = KMeans(n_clusters=5).fit(cosine_rating)
R = ratings.drop(['userId','rating','timestamp'], axis=1)
R = R.drop_duplicates().sort_values(by='movieId')
R = R.set_index("movieId")
R['Kmeans'] = pd.Series(kmeans.labels_)
Merge_ratings = ratings.drop(['timestamp'], axis=1)
df_merge_how_left = pd.merge(Merge_ratings,R,how='left',on='movieId')
# plt.figure(figsize=(12,7))
# axis = sns.barplot(x=np.arange(0,5,1),y=df_merge_how_left.groupby(['Kmeans']).count()['movieId'].values)
# x=axis.set_xlabel("Cluster Number")
# x=axis.set_ylabel("Number of movies")
# plt.show()

dendrogram = sch.dendrogram(sch.linkage(cosine_rating, method='ward'))
model = AgglomerativeClustering(n_clusters=5, affinity='euclidean', linkage='ward')
model.fit(cosine_rating)
labels = model.labels_
my_df = pd.DataFrame(data=labels, columns=['Hierarchical'])
my_df["movieId"] = pd.DataFrame({"movieId":[i for i in range(1,3707)]})
my_df = my_df.fillna(0)
my_df['Hierarchical']=my_df['Hierarchical'].astype('int')
DF_merge_how_left = pd.merge(df_merge_how_left,my_df,how='left',on='movieId')
# plt.figure(figsize=(12,7))
# axis = sns.barplot(x=np.arange(0,5,1),y=DF_merge_how_left.groupby(['Hierarchical']).count()['movieId'].values)
# x=axis.set_xlabel("Cluster Number")
# x=axis.set_ylabel("Number of movies")​


gmm = GaussianMixture(n_components=20).fit(cosine_rating)
movie_labels = pd.DataFrame()
movie_labels["labels"] = gmm.predict(cosine_rating)
movie_labels["movieId"] = pd.DataFrame({"movieId":[i for i in range(1,3707)]})
SF_merge_how_left = pd.merge(DF_merge_how_left,movie_labels,how='left',on='movieId')
SF_merge_how_left.rename({'labels': 'GM'}, axis=1, inplace=True)
# plt.figure(figsize=(12,20))
# axis = sns.barplot(x=np.arange(0,20,1),y=SF_merge_how_left.groupby(['GM']).count()['movieId'].values)
# x=axis.set_xlabel("Cluster Number")
# x=axis.set_ylabel("Number of movies")
# plt.show()
SF_merge_how_left = SF_merge_how_left.drop(['id_x','id_y','rating','userId'], axis=1)
SF_merge_how_left = SF_merge_how_left.fillna(0)
SF_merge_how_left = SF_merge_how_left.drop_duplicates('movieId')
print(SF_merge_how_left)
# SF_merge_how_left.to_sql('api_clustering', con)