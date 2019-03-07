import sys
sys.stdin = open('input11.txt','r')

total = int(input())
for index in range(1,total+1):
    N,M = map(int,input().split())
    numlist = []
    for i in range(N):
        numlist += [list(map(int,input().split()))]
    MAX = 0
    mid = 0
    result = []
    a = []
    b = 0
    for q in range(N - M + 1):
        for k in range(N - M + 1):
            for j in range(M):
                mid += sum(numlist[q+j][k:k+M])
                a = numlist[q+j][k:k+M]
                b = sum(numlist[q+j][k:k+M])
            if mid > MAX:
                MAX = mid
            mid = 0

    print('#{} {}'.format(index,MAX))


