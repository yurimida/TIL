# my_number, real_numbers, bonus_number
# 1등 : my_numbers == real_numbers
# 2등 : real & my 5개가 같고, my의 나머지 하나가 bonus_number
# 3등 : real & my가 5개가 같다 
# 4등 : real & my가 4개가 같다
# 5등 : real & my가 3개가 같다
# 꽝

# print (1,2,3,4,5등을 출력해 내기)


get_lottery = [1,4,24,34,35,39]
bn = [7]

pick_lottery = []

# 긁음
# a Lotto simulator ...
# here we let the user pick the winning numbers and the computer buys the tickets
#
# the user selects 6 unique random numbers from 1 to 50 and creates a list
# the computer generates similar lists and compares these lists with the user list
# whenever there are 3, 4, 5 or 6 matches, corresponding counters are updated
# finally all the matches are shown
# tested with Python24       vegaseat      14sep2006
import random
def computer_random():
     """let the computer create a list of 6 unique random integers from 1 to 50"""
     ci = random.sample(range(1,50), 6)
     return ci
    
def user_random():
     """let the user create a list of 6 unique random integers from 1 to 50"""
     print "Enter 6 unique random integers from 1 to 50:"
     ui = []
     while len(ui) < 6:
         print len(ui) + 1,
         try:
             i = input("--> ")
             # check if i is unique and has a value from 1 to 50
             # and is an integer, otherwise don't append
             if (i not in ui) and (1 <= i <= 50) and type(i) == type(7):
                ui.append(i)
         except:
             print "Enter an integer number!"
     return ui
def match_lists(list1, list2):
    """to find the number of matching items in each list use sets"""
    set1 = set(list1)
    set2 = set(list2)
    # set3 contains all items comon to set1 and set2
    set3 = set1.intersection(set2)
    # return number of matching items
    return len(set3)
    
# the user picks the 6 winning numbers
user_list = user_random()
print "Winning numbers:", user_list
# set up counters for 3 to 6 matches
match3 = 0
match4 = 0
match5 = 0
match6 = 0
print
# the computer picks the numbers for each ticket sold
tickets_sold = 1000000
print "Just a moment ..."
for k in range(tickets_sold):
    comp_list = computer_random()
    matches = match_lists(comp_list, user_list)
    if matches == 3:
        match3 += 1
    elif matches == 4:
        match4 += 1
    elif matches == 5:
        match5 += 1
    elif matches == 6:
        match6 += 1
    # optional progress indicator
    if k % 100000 == 0:
        print ">",
    
print; print
print "Out of %d tickets sold the computer found these matches:" % tickets_sold
print "3 matches = %d" % match3
print "4 matches = %d" % match4
print "5 matches = %d" % match5
print "6 matches = %d" % match6