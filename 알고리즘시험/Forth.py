import sys
sys.stdin = open('input13.txt','r')

total = int(input())
for index in range(1,total+1):
    cal = list(map(str,input().split()))
    stack = []
    for i in cal:
        if type(int(i)) == int:
            stack.append(int(i))

