const nameInput = $('#todoName');
const list = $('.js-list');
const searchContainer = $('.js-search-container');
const searchInput = $('.js-search-input');

const createTodo = function() {
    const name = nameInput.val();

    if (!name.trim().length) {
        return;
    }

    list.append(`<li class="todo"><div class="todo-state"><i class="fas fa-check"></i></div><input class="todo-text js-todo-text" value="${name}"><div class="todo-remove"><i class="fas fa-trash"></i></i></div></li>`);
    if (list.find('li').length > 6) {
        list.css('height', `${list.height()}px`);
    }
    nameInput.val('');
};

$(function() {
    nameInput.on('keyup', function(event) {
        if (event.key === 'Enter') {
            createTodo();
        }
    });

    $('.js-create-todo').click(function(event) {
        createTodo();
    });

    list.on('keydown', function(event) {
        if (event.target.value.length <= 1 && event.key === 'Backspace' || (event.ctrlKey && event.key === 'Backspace')) {
            event.preventDefault();
        }

        event.stopPropagation();
    });

    list.on('click', function(event) {
        if ($(event.target).hasClass('fa-check') || $(event.target).hasClass('todo-state')) {
            $(event.target).closest('.todo').toggleClass('done');
            event.stopPropagation();
        }

        if ($(event.target).hasClass('fa-trash') || $(event.target).hasClass('todo-remove')) {
            $(event.target).closest('.todo').remove();
            event.stopPropagation();
        }
    });

    searchInput.on('keyup', function(event) {
        const term = searchInput.val();

        if (!term.trim().length) {
            list.find('li').show();
            return;
        }

        list.find('li').each(function(index, item) {
            let todoText = $(item).find('.todo-text').val();
            
            if (todoText.indexOf(term) !== -1) {
                $(item).show();
            } else {
                $(item).hide();
            }
        });
    });

    $('.js-toggle-search').click(function() {
        searchContainer.toggleClass('open');
    });
});