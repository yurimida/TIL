import sys
sys.stdin = open('input4.txt','r')

total = int(input())
for index in range(1,total+1):
    N , M = map(int,input().split())
    num = list(map(int,input().split()))
    result = []
    for i in range(N-M+1):
        result.append(sum(num[i:M+i]))
    print(result)
    print('#{} {}'.format(index,max(result)-min(result)))