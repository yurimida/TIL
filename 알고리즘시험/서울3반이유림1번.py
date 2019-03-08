import sys
sys.stdin = open('input17.txt','r')

total = int(input())

for index in range(1,total+1):
    N, K = map(int,input().split())
    friuts = []
    for i in range(N):
        friuts.append(list(map(int,input().split())))

    mid = []
    result = []
    R = []
    right = 0
    left = 0
    for j in range(N-K+1):
        for q in range(N-K+1):
            for k in range(K):
                mid.append(friuts[j+k][q:q+K])

            for o in range(K):
                for p in range(K):
                    if o == p:
                        right += mid[o][p]
                    if o + p == K -1 :
                        left += mid[o][p]
            R.append(abs(right-left))
            right = 0
            left = 0
            mid = []

    print('#{} {}'.format(index,min(R)))