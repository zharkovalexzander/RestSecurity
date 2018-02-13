let mainText = "Check out a new opportunity to discover the world. Just log in for the journey!"

let AuthForm = React.createClass({
    propTypes: {
        value: React.PropTypes.object.isRequired,
        onChange: React.PropTypes.func.isRequired,
        onSubmit: React.PropTypes.func.isRequired
    },

    onNameChange: function (e) {
        this.props.onChange(Object.assign({}, this.props.value, {
            name: e.target.value
        }));
    },

    onCodeChange: function (e) {
        this.props.onChange(Object.assign({}, this.props.value, {
            code: e.target.value
        }));
    },

    onSubmit: function (e) {
        e.preventDefault();
        this.props.onSubmit();
    },

    render: function () {
        return (
            React.createElement('form', {
                    onSubmit: this.onSubmit,
                    className: 'AuthForm',
                    noValidate: true
                },
                React.createElement('div', {
                    className: 'i i_name',
                    type: 'text',
                }, "OPEN YOUR MIND"),
                React.createElement('div', {
                    className: 'parag',
                    type: 'text',
                }, mainText),
                React.createElement('input', {
                    className: 'i inputs',
                    type: 'text',
                    placeholder: 'Name',
                    value: this.props.value.name,
                    onChange: this.onNameChange,
                }),
                React.createElement('input', {
                    className: 'i inputs',
                    type: 'text',
                    placeholder: 'Code',
                    value: this.props.value.code,
                    onChange: this.onCodeChange,
                }),
                React.createElement('button', {
                    type: 'submit',
                    className: 'button'
                }, 'Log in')
            )
        );
    },
});

let AuthView = React.createClass({
    propTypes: {
        newAuth: React.PropTypes.object.isRequired,
        onNewCreditsChange: React.PropTypes.func.isRequired,
        onNewCreditsSubmit: React.PropTypes.func.isRequired,
    },

    componentDidMount: function () {
        $("#loader").remove();
    },

    render: function () {
        return (
            React.createElement('div', {
                className: 'back',
                "data-vide-bg": "mp4: static/media/video",
                "data-vide-options": "loop: true, muted: true, position: 0% 0%",
            }, React.createElement('div', {
                    className: 'fader'
                },
                React.createElement('div', {
                        className: 'AuthView'
                    },
                    React.createElement(AuthForm, {
                        value: this.props.newAuth,
                        onChange: this.props.onNewCreditsChange,
                        onSubmit: this.props.onNewCreditsSubmit,
                    })
                )
            )));
    },
});

let credentials = {
    name: "",
    code: ""
};
let state = {};

function updateNewAuth(auth) {
    setState({
        newAuth: auth
    });
}


function submitNewAuth() {
    var auth = Object.assign({}, state.newAuth);

    if (auth.name && auth.code) {
        let security = new RestSecurity("http://localhost:8080/auth");
        security.addCredits("name", auth.name);
        security.addCredits("code", auth.code);
        security.perform(false, function (output) {
            alert(output);
        });
    }
}

function setState(changes) {
    Object.assign(state, changes);

    ReactDOM.render(
        React.createElement(AuthView, Object.assign({}, state, {
            onNewCreditsChange: updateNewAuth,
            onNewCreditsSubmit: submitNewAuth
        })),
        document.getElementById('root')
    );
}

setState({
    newAuth: Object.assign({}, credentials)
});