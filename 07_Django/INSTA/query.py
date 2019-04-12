from mton.models import Student,Lecture,Enrolment,Grade

# create_student = Student.objects.create
# s1 = create_student(name='이종화')
# s2 = create_student(name='고재두')
# s3 = create_student(name='박병준')
#
# l1 = Lecture.objects.create(title='컴개')
# l2 = Lecture.objects.create(title='자료구조')
# l3 = Lecture.objects.create(title='알고리즘')
#
# Enrolment.objects.create(lecture=l1,student=s1)
# Enrolment.objects.create(lecture=l1,student=s2)
# Enrolment.objects.create(lecture=l1,student=s3)

이종화 = Student.objects.get(id=1)
이종화.enrolment_set.all()
for 수강신청 in 이종화의_수강신청_목록:
    print(수강신청.lecture.title)


#[
# id=1 , lecture_id=1, student_id=1
# ]