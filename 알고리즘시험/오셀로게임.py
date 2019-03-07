import sys
sys.stdin = open('input16.txt','r')

total = int(input())
for index in range(1,total+1):
    N,M = map(int,input().split())
    zari = [[0 for i in range(N)] for j in range(N)]
    P = (N // 2) - 1
    for j in range(2):
        zari[P+j][P+1] = 1
        zari[P+j][P] = 2

    for i in range(M):
        x, y, color = map(int,input().split())
        x = x-1
        y = y-1

    diff = [(-1,-1),(0,-1),(1,-1),(-1,0),(1,0),(-1,1),(0,1),(1,1)]

    def DFS(x,y):

        for (dx,dy) in diff:
            tx = x + dx
            ty = y + dy
            if tx < 0 or ty  < 0 or tx == N or ty == N:
                continue
            if


