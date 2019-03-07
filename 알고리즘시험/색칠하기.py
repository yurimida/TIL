import sys
sys.stdin = open('input6.txt','r')

total = int(input())
for index in range(1,total+1):
    N = int(input())
    result = [[0 for i in range(10)] for j in range(10)]
    count = 0
    for i in range(N):
         x1,x2,y1,y2,color = map(int,input().split())

         for j in range(x1,y1+1):
             for k in range(x2,y2+1):
                 result[j][k] += color

    for q in range(10):
        for g in range(10):
            if 3 == result[q][g]:
                count += 1
    print('#{} {}'.format(index,count))


