import sys
sys.stdin=open('input5.txt','r')


T = int(input())

for test_case in range(1, T + 1):
    K, N, M = map(int, input().split())
    station = [0] * (N + 1)
    arr = list(map(int, input().split()))
    for i in range(len(arr)):
        station[arr[i]] = 1

    ans = pos = 0
    while pos + K < N:
        prev = pos
        for i in range(pos + K, pos, -1):
            if station[i] == 1:
                pos = i
                ans = ans + 1
                break

        if prev == pos:
            ans = 0
            break

    print('#%d %d' % (test_case, ans))

# total = int(input())
#
# for index in range(1,total+1):
#     K,N,M = map(int,input().split())
#     charge = list(map(int,input().split()))
#     current = 0
#     count = 0
#     flag = False
#     for j in range(len(charge)-1):
#         if charge[j+1] - charge[j] > K:
#             flag = True
#             break
#     while current < N:
#         if flag:
#             break
#
#         if current+K >= N :
#             break
#         if current+K in charge:
#             current = current + K
#             count += 1
#
#         else:
#             for i in range(1,K+1):
#                 if current+K-i in charge:
#                     current = current+K-i
#                     count += 1
#                     break
#
#     print('#{} {}'.format(index, count))

