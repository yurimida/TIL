import sys
sys.stdin = open('input9.txt','r')

total = int(input())
light = list(map(int,input().split()))
studentnum = int(input())
result = []
baesu = []

for i in range(studentnum):
    s, give = map(int,input().split())
    mid = len(light) // 2
    give = give-1
    after = []
    A = 0
    before = []
    B = 0
    flag = False
    if s == 2:
        if give < mid:
            result = light[0:give+give+1]
            after = light[give+give+1:]
            A = 1

        elif give >= mid:
            T = len(light) - give - 1
            result = light[give-T : give+T+1]
            before = light[0:give-T]
            B = 1

        for j in range(len(result)//2):
            MID = len(result)//2
            if result[MID-j] != result[MID+j]:
                if result[MID] == 0:
                    result[MID] == 1
                else:
                    result[MID] == 0

                flag = True

        if flag == False:
            for k in range(len(result)):
                if result[k] == 0:
                    result[k] = 1
                else:
                    result[k] = 0

        if B == 1:
            result = before+result

        elif A == 1:
            result = result+after


    # 남학생
    elif s == 1:
        for u in range(1,101):
            if u % (give+1) == 0:
                baesu.append(u)
        print(baesu)
        for t in range(len(light)):
            if t+1 in baesu:
                if light[t] == 1:
                    light[t] = 0
                else:
                    light[t] = 1
        result = light


for x in range(len(result)):
    if x == len(result):
        print(result[x])
    if x % 20 == 0 and x != 0:
        print()
    print(result[x], end=' ')