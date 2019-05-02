const init = () => {
    const todoBox = document.querySelector('#todo_box');
    const reverserButton = document.querySelector('#reverse_btn');
    const fetchButton = document.querySelector('#fetch_btn');
    const inputArea = document.querySelector("#add_todo_input");
    const add_button = document.querySelector('#add_todo_btn');

//TODO: input 태그 , Add 버튼에 cratedTodo와 이벤트 리스너를 잘 버무린다.
    reverserButton.addEventListener('click', e => {
        reverseTodos()
    });


    fetchButton.addEventListener('click', e => {
        //TODO: 버튼 만들고, 데이터 받아오게 이벤트 리스너 클립 얍!
        const fetchData = URL => {
            fetch(URL)
                .then(res =>res.json())
                .then(todos => {
                    for (const todo of todos) {
                        todoBox.appendChild(createTodo(todo.title, todo.completed));
                    }
                })
        };
        fetchData('https://koreanjson.com/todos');
    });


    inputArea.addEventListener('keydown', e =>{
        if (e.key === 'Enter'){ //e 옆에 code면 num 옆의 enter가 안됨
            todoBox.appendChild(createTodo(inputArea.value));
        }
    });
    add_button.addEventListener('click', e=>{

        todoBox.appendChild(createTodo(inputArea.value));

    });
    const createTodo = (inputText, completed=false) => {
        // Card
        const todoCard = document.createElement('div');

        todoCard.classList.add('ui', 'segment', 'todo-item');
        if (completed) todoCard.classList.add('secondary');
        // 위에 두 줄은 다음 코드 요약한 것
        // if (completed) {
        //     todoCard.className = 'ui secondary segment todo-item';
        // } else {
        //     todoCard.className = 'ui segment todo-itme';
        // }
        // Card > Wrapper
        const wrapper = document.createElement('div');
        wrapper.classList.add('ui', 'checkbox');
        // Card > Wrapper > input ( checkbox)
        const input = document.createElement('input');
        input.setAttribute('type', 'checkbox');
        input.checked = completed;

        input.addEventListener('click', e => {
            if (completed) {
                label.classList.remove('completed-label');
                todoCard.classList.remove('secondary');
            } else {
                label.classList.add('completed-label');
                todoCard.classList.add('secondary');
            }
            completed = !completed;
        });
        // Card > Wrapper > input (text)
        const label = document.createElement('label');
        label.innerHTML = inputText;
        if (completed) label.classList.add('completed-label');

        // Card > Icon
        const deleteIcon = document.createElement('i'); // <i></i>
        deleteIcon.classList.add('close', 'icon', 'delete-icon'); // <i class="close icon"></i>

        deleteIcon.addEventListener('click', e => {
            todoBox.removeChild(todoCard);
        });

        wrapper.appendChild(input);
        wrapper.appendChild(label);
        todoCard.appendChild(wrapper);
        todoCard.appendChild(deleteIcon);

        return todoCard
    };

    const reverseTodos = () => {
        const allTodos = Array.from(document.querySelectorAll('.todo-item')); // 원본이 하나이므로 파이썬의 deepcopy처럼 copy 해준다. Array.from() 함수 안에 넣어줌 그래야 while문 반복하고 for문 들어가서 새로운 todo를 더해줌
        while (todoBox.firstChild) {
            todoBox.removeChild(todoBox.firstChild)
        }
        for (const todo of allTodos.reverse()) {
            todoBox.appendChild(todo)
        }
    };

    todoBox.appendChild(createTodo('hihi', true));


};

init();