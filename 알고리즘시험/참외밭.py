import sys
sys.stdin = open('input14.txt','r')

ym = int(input())

first = []

second = []
for i in range(6):
    if i <= 2:
        first.append(list(map(int,input().split())))

    else:
        second.append(list(map(int, input().split())))


