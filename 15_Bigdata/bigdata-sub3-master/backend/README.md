# backend

## Project setup
```
pip install -r requirements.txt
```

### Mygration database
```
python manage.py makemigrations
python manage.py migrate
```

### Add admin accounts
```
python manage.py shell < create_admin.txt
```

### Compiles and hot-reloads for development
```
python manage.py runserver
```

### migrate 정리하는 방법
```
1)python manage.py migrate api zero
2)db.sqlite3 지우기 / 0.xx initial.py 지우기
3)python manage.py makemigrations
4)python manage.py migrate
```
