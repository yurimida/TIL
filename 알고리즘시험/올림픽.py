import sys
sys.stdin = open('input8.txt','r')
#
N, K = map(int, input().split())
# nations = []
# for n in range(N):
#     nation = list(map(int, input().split()))
#     nations += [nation]
# def qsort(na, m):
#     if len(na) <= 1:
#         return na
#     pivot = na[len(na) >> 1][m] # pivot의 중간값을 잡기 위함.
#     L = []
#     R = []
#     E = []
#     for a in na:
#         if a[m] < pivot:
#             R.append(a)
#         elif a[m] > pivot:
#             L.append(a)
#         else:
#             E.append(a)
#     if m <= 2:
#         E = qsort(E, m+1)
#     return qsort(L, m) + E + qsort(R, m)
# nations = qsort(nations, 1)
# answer = 0
# for i in range(len(nations)):
#     if nations[i][0] == K:
#         q = 1
#         while i - q >= 0:
#             if nations[i][1:] == nations[i-q][1:]:
#                 q += 1
#             else: break
#         answer = i - q + 2
#         break
# print(answer)
SUM = []
result = [[0,0]]
G = []
for i in range(N):
    index, gold, silver, bronze = map(int,input().split())
    G[index] = [index, gold*1000000 + silver*1 + bronze*0.000001]
    SUM += [gold*1000000 + silver*1 + bronze*0.000001]

SUM.sort(reverse=True)

for k in SUM:
    for n in range(N+1):
        if G[n][1] == k:
            result.append(G[n])
            break
for g in G:
    if g[0] == K:
        find = g[1]

for p in result:
    if p[1] == find:
        RESULT = p[0]
        break

print(RESULT)
#
#
#
