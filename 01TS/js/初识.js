/**
 * 1. 类型注解
 * 2. 接口
 * 3. 类
 */
(function () {
    var str = "asdasd";
    var person = {
        firstName: 'jason',
        lastName: 'john'
    };
    var User = /** @class */ (function () {
        function User(firstName, lastName) {
            this.firstName = firstName;
            this.lastName = lastName;
        }
        return User;
    }());
    function setStr(str) {
        console.log('out' + str);
    }
    function setPerson(person) {
        console.log(person.firstName + '_' + person.lastName);
    }
    setStr(str);
    setPerson(person);
    var user = new User('jason', 'johns');
    setPerson(user);
})();
