import sys
sys.stdin = open('input3.txt','r')

total = int(input())

for index in range(1,total+1):
    N = int(input())
    cardlist = list(map(int,''.join(input().split())))
    numdict = {}
    for i in cardlist:
        numdict[i] = cardlist.count(i)

    Max = 0
    maxkey = []
    for key,val in numdict.items():
        if Max < val:
            Max = val

    for key, val in numdict.items():
        if val == Max:
            maxkey.append(key)

    print('#{} {} {}'.format(index,max(maxkey),Max))


