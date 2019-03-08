import sys
sys.stdin = open('input18.txt','r')

total = int(input())

for index in range(1,total+1):
    N = int(input())
    island = []

    for i in range(N):
        island.append(list(map(str,input().split())))


    c = []
    d = []
    ISLAND = 0
    for j in range(N):
        for k in range(N):
            if island[j][k] != '0':
                c.append(island[j][k])
                if island[j+1][k] == '0':
                    d.append(island[j+1][k])
                    if island[j][k+1] == '0':
                        if len(c) == len(d):
                            ISLAND += 1
            elif island[j][k] == '0':
                c =[]
                d = []

        c =[]
        d = []
    MAX = 0
    for q in range(N):
        for g in range(N):
            if MAX < int(island[q][g]):
                MAX = int(island[q][g])

    print('#{} {} {}'.format(index,ISLAND,MAX))




