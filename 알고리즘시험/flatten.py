import sys
sys.stdin = open('input1.txt', 'r')

for index in range(1,11):
    N = int(input())
    boxes = list(map(int,input().split()))
    count = 0
    flag = False
    Max = boxes[0]
    Min = boxes[-1]

    while count < N:


        for i in boxes:
            if i > Max:
                Max = i

            elif i < Min:
                Min = i

        if (Max - Min) <= 1:
            print(count)
            flag =True
            break

        a = boxes.index(Max)
        b = boxes.index(Min)

        boxes[a] = boxes[a] - 1
        boxes[b] = boxes[b] + 1

        count += 1

    if flag:
        break

    print('못함')
