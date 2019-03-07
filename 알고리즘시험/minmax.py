import sys
sys.stdin = open('input2.txt','r')

total = int(input())

for index in range(1,total+1):
    N = int(input())
    numlist = list(map(int,input().split()))
    Max = numlist[0]
    Min = numlist[0]
    for i in numlist:
        if i > Max:
            Max = i

        elif i < Min:
            Min = i


    print('#{} {}'.format(index, (Max-Min)))
