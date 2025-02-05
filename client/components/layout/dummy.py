# for i in range(5):
#     for j in range(5):
#         if(i+j<5):
#             print(i+j+1 ,end=' ')
#         else:
#             print(i+j-4,end=' ')
        
#     print()

# count=1
# for i in range(5):
#     for j in range(5):
#         if(i>=j):
#             print(count,end=' ')
#             count+=1
#         else:
#             print(" ",end=' ')

#     print()

#     * * * *
#    * * * *
#   * * * *
#  * * * *



# for i in range(4):
#     for j in range(7):
#         if((i==1 or i==2)and (i+j==4 or i+j==5)):
#             print( ' ',end=" ")
#         elif(i+j>=3 and i+j<=6):
#             print("*",end=' ')
#         else:
#             print(" ",end=' ')
#     print()



a=[10,4,-8,1]
ls=0
rs=0
sum=0
count=0
n=(len(a))
print(n)
for i in range (n):
    ls=ls+a[i]
    rs=rs+a[n-i-1]
    print("ls",ls," rs ",rs)
    if (ls>rs):
        count+=1
print(count)
