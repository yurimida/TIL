import sys
sys.stdin = open('input12.txt','r')

total = int(input())
for index in range(1,total+1):
    char = []
    for i in range(5):
        char += [list(input())]

    MAX =  0
    for j in char:
        if MAX < len(j):
            MAX = len(j)

    for k in range(len(char)):
        if len(char[k]) != MAX:
            for q in range(MAX-len(char[k])):
                char[k].append('-1')
    result = []
    for w in range(MAX):
        for r in range(5):
            if char[r][w] != '-1':
                result.append(char[r][w])

    R = ''.join(map(str,result))
    print('#{} {}'.format(index,R))