import sys
sys.stdin = open('input7.txt','r')
bingo = []
call = []
for i in range(5):
    bingo += [list(map(int,input().split()))]

for j in range(5):
    call += map(int,input().split())

xlist = [0] * 5
ylist = [0] * 5
same = 0
same2 = 0
COUNT = 0
result = 0
flag = False
for k in call:
    for n in range(5):
        for m in range(5):
            if k == bingo[n][m]:
                xlist[n] += 1
                ylist[m] += 1
                if n == m:
                    same += 1
                if m+n == 4:
                    same2 += 1
                if COUNT < 3:
                    for q in range(5):
                        if xlist[q] == 5:
                            COUNT += 1
                            xlist[q] = 0
                    for w in range(5):
                        if ylist[w] == 5:
                            COUNT += 1
                            ylist[w] = 0
                    if same == 5:
                        COUNT += 1
                        same = 0
                    if same2 == 5:
                        COUNT += 1
                        same2 = 0
                elif COUNT >= 3:
                    print(result)
                    flag = True
                    break
        if flag:
            break
    if flag:
        break
    result += 1