(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
'use strict';

/**
 * This is the entry point for the JavaScript application which runs in the
 * web browser. We call `window.main` when the page loads, and use that
 * opportunity to create the Redux store and mount the root React component.
 */

var React = require('react');
var ReactDOM = require('react-dom');

var createStore = require('./helpers/createStore');
var Root = React.createFactory(require('./components/Root'));

// Initialisation function which we will call on page load
window.main = function (initialState) {
  // Create root React component with Redux store
  var store = createStore(initialState);
  var rootComponent = Root({ store: store });

  // Mount React root component in DOM
  var mountPoint = document.getElementById('root');
  ReactDOM.render(rootComponent, mountPoint);
};

},{"./components/Root":15,"./helpers/createStore":19,"react":"react","react-dom":"react-dom"}],2:[function(require,module,exports){
'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var React = require('react');

var NoteNew = require('./NoteNew');
var Note = require('./Note');

var ActiveNotebook = function (_React$Component) {
  _inherits(ActiveNotebook, _React$Component);

  function ActiveNotebook(props) {
    _classCallCheck(this, ActiveNotebook);

    return _possibleConstructorReturn(this, (ActiveNotebook.__proto__ || Object.getPrototypeOf(ActiveNotebook)).call(this, props));
  }

  _createClass(ActiveNotebook, [{
    key: 'render',
    value: function render() {
      var _this2 = this;

      var createNoteComponent = function createNoteComponent(currentNote) {
        /* TODO Section 8: Add code for delete */
        return React.createElement(
          'div',
          null,
          React.createElement(Note, {
            key: currentNote.noteId,
            note: currentNote,
            saveNote: _this2.props.saveNote,
            notebookId: _this2.props.notebookId,
            deleteNote: _this2.props.deleteNote
          })
        );
      };

      return React.createElement(
        'div',
        null,
        React.createElement(
          'h2',
          null,
          this.props.notebook.title
        ),
        React.createElement(
          'ul',
          null,
          this.props.notes.map(createNoteComponent)
        ),
        React.createElement(NoteNew, { createNote: this.props.createNote, notebookId: this.props.notebookId })
      );
    }
  }]);

  return ActiveNotebook;
}(React.Component);

module.exports = ActiveNotebook;

},{"./Note":6,"./NoteNew":8,"react":"react"}],3:[function(require,module,exports){
'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var React = require('react');
var ReduxDevtools = require('redux-devtools');
var DockMonitor = require('redux-devtools-dock-monitor').default;
var LogMonitor = require('redux-devtools-log-monitor').default;

var InternalDevTools = ReduxDevtools.createDevTools(React.createElement(
  DockMonitor,
  { toggleVisibilityKey: 'h', changePositionKey: 'q', defaultIsVisible: false },
  React.createElement(LogMonitor, null)
));

var DevTools = function (_React$Component) {
  _inherits(DevTools, _React$Component);

  function DevTools(props) {
    _classCallCheck(this, DevTools);

    var _this = _possibleConstructorReturn(this, (DevTools.__proto__ || Object.getPrototypeOf(DevTools)).call(this, props));

    _this.state = { isMounted: false };
    return _this;
  }

  _createClass(DevTools, [{
    key: 'componentDidMount',
    value: function componentDidMount() {
      this.setState({ isMounted: true });
    }
  }, {
    key: 'render',
    value: function render() {
      return React.createElement(
        'div',
        null,
        this.state.isMounted && React.createElement(InternalDevTools, null)
      );
    }
  }], [{
    key: 'instrument',
    value: function instrument() {
      return InternalDevTools.instrument.apply(InternalDevTools, arguments);
    }
  }]);

  return DevTools;
}(React.Component);

/**
 * Redux development tools (useful for debugging).
 */


module.exports = DevTools;

},{"react":"react","redux-devtools":"redux-devtools","redux-devtools-dock-monitor":"redux-devtools-dock-monitor","redux-devtools-log-monitor":"redux-devtools-log-monitor"}],4:[function(require,module,exports){
'use strict';

/**
 * This file contains the Home component.
 * Other React components for viewing notes and notebooks should be nested
 * beneath the Home component.
 */

var React = require('react');

var NotebookList = require('./NotebookList');

/*
  *** TODO: Start building the frontend from here ***
  You should remove the placeholder text and modify the component as you see
  fit while working on the assignment.
*/
var Home = function Home() {
  return React.createElement(
    'div',
    { className: 'container' },
    React.createElement(
      'h1',
      null,
      'Neverwrote'
    ),
    React.createElement(
      'p',
      null,
      'Never say I never wrote that down.'
    ),
    React.createElement(NotebookList, null)
  );
};

module.exports = Home;

},{"./NotebookList":12,"react":"react"}],5:[function(require,module,exports){
'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var React = require('react');

/**
 * A markdown editor. Markdown is a very simple language for formatting
 * text that can be converted into HTML.
 */

var MarkdownEditor = function (_React$Component) {
  _inherits(MarkdownEditor, _React$Component);

  function MarkdownEditor() {
    _classCallCheck(this, MarkdownEditor);

    return _possibleConstructorReturn(this, (MarkdownEditor.__proto__ || Object.getPrototypeOf(MarkdownEditor)).apply(this, arguments));
  }

  _createClass(MarkdownEditor, [{
    key: 'componentDidMount',
    value: function componentDidMount() {
      var _this2 = this;

      // SimpleMDE must be required here since it's browser-only.
      var SimpleMDE = require('simplemde');

      // Turn our plain old text area into a beautiful markdown editor
      this.simpleMDE = new SimpleMDE({
        indentWithTabs: false,
        status: false,
        autoDownloadFontAwesome: false,
        element: this.textarea
      });

      // Put initial text in the editor
      this.simpleMDE.value(this.props.value);

      // Listen for changes and fire a callback
      this.simpleMDE.codemirror.on('change', function () {
        var newText = _this2.simpleMDE.value();
        if (newText !== _this2.props.value) {
          _this2.props.onChange({ target: { value: newText } });
        }
      });
    }
  }, {
    key: 'componentDidUpdate',
    value: function componentDidUpdate() {
      // Replace the text in the editor, preserving the cursor position and
      // selection info
      var selections = this.simpleMDE.codemirror.listSelections();
      this.simpleMDE.value(this.props.value);
      this.simpleMDE.codemirror.setSelections(selections);
    }

    // Describe how to render the component

  }, {
    key: 'render',
    value: function render() {
      var _this3 = this;

      var ref = function ref(element) {
        _this3.textarea = element;
      };
      return React.createElement('textarea', { ref: ref });
    }
  }]);

  return MarkdownEditor;
}(React.Component);

// Export the component so that it can be required


module.exports = MarkdownEditor;

},{"react":"react","simplemde":"simplemde"}],6:[function(require,module,exports){
'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var React = require('react');

var NoteEdit = require('./NoteEdit');
var NoteView = require('./NoteView');

var Note = function (_React$Component) {
  _inherits(Note, _React$Component);

  function Note(props) {
    _classCallCheck(this, Note);

    // Set initial internal state for this component
    var _this = _possibleConstructorReturn(this, (Note.__proto__ || Object.getPrototypeOf(Note)).call(this, props));

    _this.state = { editing: false };
    return _this;
  }

  _createClass(Note, [{
    key: 'render',
    value: function render() {
      var _this2 = this;

      var openEdit = function openEdit() {
        _this2.setState({ editing: true });
      };

      var closeEdit = function closeEdit() {
        _this2.setState({ editing: false });
      };

      var saveEdit = function saveEdit(editedNote) {
        _this2.props.saveNote(editedNote, function (err) {
          if (!err) closeEdit();
        });
      };

      // TODO Section 8: Add code for delete
      var deleteThisNote = function deleteThisNote() {
        _this2.props.deleteNote(_this2.props.note.id);
      };

      if (this.state.editing) {
        // Render component for editing the post
        return React.createElement(NoteEdit, {
          note: this.props.note,
          onNoteSave: saveEdit,
          onCancel: closeEdit,
          notebookId: this.props.notebookId
        });
      }
      // Render read-only view of the post
      // TODO Section 8: add code for delete
      return React.createElement(NoteView, {
        note: this.props.note,
        onDeleteNote: deleteThisNote,
        onEdit: openEdit
      });
    }
  }]);

  return Note;
}(React.Component);

// Export the Note component


module.exports = Note;

},{"./NoteEdit":7,"./NoteView":9,"react":"react"}],7:[function(require,module,exports){
'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var React = require('react');
var _ = require('lodash');
var MarkdownEditor = require('./MarkdownEditor');

/**
 * A form for editing a blog post.
 */

var NoteEdit = function (_React$Component) {
  _inherits(NoteEdit, _React$Component);

  function NoteEdit(props) {
    _classCallCheck(this, NoteEdit);

    var _this = _possibleConstructorReturn(this, (NoteEdit.__proto__ || Object.getPrototypeOf(NoteEdit)).call(this, props));

    var note = props.note || {};

    _this.state = {
      title: note.title || '',
      content: note.content || '',
      notebookId: _this.props.notebookId
    };
    return _this;
  }

  _createClass(NoteEdit, [{
    key: 'render',
    value: function render() {
      var _this2 = this;

      var revertAndStopEditing = function revertAndStopEditing(event) {
        event.preventDefault();
        _this2.props.onCancel();
      };

      var submitAndStopEditing = function submitAndStopEditing(event) {
        event.preventDefault();
        // Creates a new post object and saves it.
        var editedNote = _.assign({}, _this2.props.note, {
          title: _this2.state.title,
          content: _this2.state.content,
          notebookId: _this2.props.notebookId
        });
        _this2.props.onNoteSave(editedNote);
      };

      var onTitleChange = function onTitleChange(event) {
        _this2.setState({ title: event.target.value });
      };

      var onContentChange = function onContentChange(event) {
        _this2.setState({ content: event.target.value });
      };

      return React.createElement(
        'form',
        { className: 'blog-post' },
        React.createElement(
          'div',
          { className: 'form-group' },
          React.createElement('input', { className: 'form-control input-lg', value: this.state.title,
            placeholder: 'Note title', onChange: onTitleChange
          })
        ),
        React.createElement(
          'div',
          null,
          React.createElement(MarkdownEditor, { value: this.props.value, onChange: onContentChange })
        ),
        React.createElement(
          'button',
          { className: 'btn btn-default pull-right',
            onClick: submitAndStopEditing
          },
          'Save'
        ),
        React.createElement(
          'button',
          { className: 'btn btn-default pull-right',
            style: { marginRight: '12px' },
            onClick: revertAndStopEditing
          },
          'Cancel'
        )
      );
    }
  }]);

  return NoteEdit;
}(React.Component);

module.exports = NoteEdit;

},{"./MarkdownEditor":5,"lodash":"lodash","react":"react"}],8:[function(require,module,exports){
'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var React = require('react');
var NoteEdit = require('./NoteEdit');

/**
 * A button which expands into a form for writing a new NOte.
 */

var NoteNew = function (_React$Component) {
  _inherits(NoteNew, _React$Component);

  function NoteNew(props) {
    _classCallCheck(this, NoteNew);

    // Set initial internal state for this component
    var _this = _possibleConstructorReturn(this, (NoteNew.__proto__ || Object.getPrototypeOf(NoteNew)).call(this, props));

    _this.state = { editing: false };
    return _this;
  }

  _createClass(NoteNew, [{
    key: 'render',
    value: function render() {
      var _this2 = this;

      var openEdit = function openEdit() {
        _this2.setState({ editing: true });
      };

      var closeEdit = function closeEdit() {
        _this2.setState({ editing: false });
      };

      var createNote = function createNote(newNote) {
        _this2.props.createNote(newNote, function (err) {
          if (!err) closeEdit();
        });
      };

      // TODO Section 7: Write code to switch to create New not edit mode when editing is clicked
      if (this.state.editing) {
        // Render component for editing the post
        return React.createElement(NoteEdit, {
          note: this.props.note,
          onNoteSave: createNote,
          content: this.props.content,
          onCancel: closeEdit,
          notebookId: this.props.notebookId
        });
      }

      return React.createElement(
        'button',
        { className: 'blog-load-more btn btn-primary btn-lg',
          onClick: openEdit
        },
        '+NewNote'
      );
    }
  }]);

  return NoteNew;
}(React.Component);

module.exports = NoteNew;

},{"./NoteEdit":7,"react":"react"}],9:[function(require,module,exports){
'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var React = require('react');
var moment = require('moment');

var NoteView = function (_React$Component) {
  _inherits(NoteView, _React$Component);

  function NoteView(props) {
    _classCallCheck(this, NoteView);

    var _this = _possibleConstructorReturn(this, (NoteView.__proto__ || Object.getPrototypeOf(NoteView)).call(this, props));

    _this.state = { dispContent: false };
    return _this;
  }

  _createClass(NoteView, [{
    key: 'render',
    value: function render() {
      var _this2 = this;

      var onEdit = function onEdit(event) {
        event.preventDefault();
        _this2.props.onEdit(_this2.props.note.id);
      };
      var DisplayContent = function DisplayContent(event) {
        event.preventDefault();
        var toggle = _this2.state.dispContent ? false : true;
        _this2.setState({ dispContent: toggle });
      };

      var deleteNote = function deleteNote(event) {
        event.preventDefault();
        _this2.props.onDeleteNote(_this2.props.note.id);
      };
      return React.createElement(
        'li',
        { className: 'blog-post', key: this.props.note.id },
        React.createElement(
          'button',
          { onClick: deleteNote, className: 'btn btn-danger' },
          React.createElement(
            'i',
            { className: 'fa fa-trash' },
            'Delete'
          )
        ),
        React.createElement(
          'a',
          { role: 'button', className: 'Note-Title', onClick: DisplayContent },
          this.props.note.title
        ),
        React.createElement(
          'a',
          { role: 'button', title: 'Edit post',
            style: { paddingRight: '8px' },
            onClick: onEdit },
          React.createElement('span', { className: 'fa fa-edit' })
        ),
        this.state.dispContent && React.createElement(
          'p',
          null,
          this.props.note.content
        )
      );
    }
  }]);

  return NoteView;
}(React.Component);

module.exports = NoteView;

},{"moment":"moment","react":"react"}],10:[function(require,module,exports){
'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var React = require('react');

var NotebookView = require('./NotebookView');

var Notebook = function (_React$Component) {
  _inherits(Notebook, _React$Component);

  function Notebook(props) {
    _classCallCheck(this, Notebook);

    return _possibleConstructorReturn(this, (Notebook.__proto__ || Object.getPrototypeOf(Notebook)).call(this, props));
    // Set initial internal state for this component
    //  this.state = { editing: false };
  }

  _createClass(Notebook, [{
    key: 'render',
    value: function render() {
      var _this2 = this;

      var deleteThisNotebook = function deleteThisNotebook() {
        _this2.props.deleteNotebook(_this2.props.notebook.id);
      };

      return React.createElement(NotebookView, {
        notebook: this.props.notebook,
        onDelete: deleteThisNotebook,
        loadData: this.props.loadData,
        setActive: this.props.setActive
      });
    }
  }]);

  return Notebook;
}(React.Component);

module.exports = Notebook;

},{"./NotebookView":14,"react":"react"}],11:[function(require,module,exports){
'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var React = require('react');
var _ = require('lodash');

/**
 * A form for editing a blog Notebook.
 */

var NotebookEdit = function (_React$Component) {
  _inherits(NotebookEdit, _React$Component);

  function NotebookEdit(props) {
    _classCallCheck(this, NotebookEdit);

    var _this = _possibleConstructorReturn(this, (NotebookEdit.__proto__ || Object.getPrototypeOf(NotebookEdit)).call(this, props));

    var notebook = props.notebook || {};

    _this.state = {
      title: notebook.title || ''
    };
    return _this;
  }

  _createClass(NotebookEdit, [{
    key: 'render',
    value: function render() {
      var _this2 = this;

      var revertAndStopEditing = function revertAndStopEditing(event) {
        event.preventDefault();
        _this2.props.onCancel();
      };

      var submitAndStopEditing = function submitAndStopEditing(event) {
        event.preventDefault();
        // Creates a new Notebook object and saves it.
        var editedNotebook = _.assign({}, _this2.props.notebook, {
          title: _this2.state.title
          //content: this.state.content
        });
        _this2.props.onSave(editedNotebook);
      };

      var onTitleChange = function onTitleChange(event) {
        _this2.setState({ title: event.target.value });
      };

      return React.createElement(
        'form',
        { className: 'blog-post' },
        React.createElement(
          'div',
          { className: 'form-group' },
          React.createElement('input', { className: 'form-control input-lg', value: this.state.title,
            placeholder: 'Notebook title', onChange: onTitleChange
          })
        ),
        React.createElement(
          'button',
          { className: 'btn btn-default pull-right',
            onClick: submitAndStopEditing
          },
          'Save'
        ),
        React.createElement(
          'button',
          { className: 'btn btn-default pull-right',
            style: { marginRight: '12px' },
            onClick: revertAndStopEditing
          },
          'Cancel'
        )
      );
    }
  }]);

  return NotebookEdit;
}(React.Component);

module.exports = NotebookEdit;

},{"lodash":"lodash","react":"react"}],12:[function(require,module,exports){
'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var React = require('react');
var ReactRedux = require('react-redux');
var _ = require('lodash');

var createActionDispatchers = require('../helpers/createActionDispatchers');
var notebooksActionCreators = require('../reducers/notebooks');
var notesActionCreators = require('../reducers/notes');
var Notebook = require('./Notebook');
var ActiveNotebook = require('./ActiveNotebook');
var NotebookNew = require('./NotebookNew');

/*
  *** TODO: Build more functionality into the NotebookList component ***
  At the moment, the NotebookList component simply renders the notebooks
  as a plain list containing their titles. This code is just a starting point,
  you will need to build upon it in order to complete the assignment.
*/

var NotebookList = function (_React$Component) {
  _inherits(NotebookList, _React$Component);

  function NotebookList() {
    _classCallCheck(this, NotebookList);

    return _possibleConstructorReturn(this, (NotebookList.__proto__ || Object.getPrototypeOf(NotebookList)).apply(this, arguments));
  }

  _createClass(NotebookList, [{
    key: 'render',
    value: function render() {
      var _this2 = this;

      var createNotebookListItem = function createNotebookListItem(notebook) {
        if (notebook.id == _this2.props.notebooks.activeNotebookId) {
          return React.createElement(ActiveNotebook, {
            key: notebook.id,
            notebook: notebook,
            notebookId: notebook.id /// was missing this one to pass to child comp
            , notes: _this2.props.notes.notes,
            createNote: _this2.props.createNote,
            deleteNote: _this2.props.deleteNote,
            saveNote: _this2.props.saveNote
            // notes={loadData(this.props.notebook.id)}
            , loadData: _this2.props.loadData
            //data={this.props.data}
          });
        }
        return React.createElement(Notebook, {
          key: notebook.id,
          notebook: notebook,
          loadData: _this2.props.loadData,
          deleteNotebook: _this2.props.deleteNotebook,
          setActive: _this2.props.setActive // added to test set active notebook
        });
      };

      return React.createElement(
        'div',
        null,
        React.createElement(
          'h2',
          null,
          'Notebooks'
        ),
        React.createElement(
          'h2',
          null,
          'It should be working!'
        ),
        React.createElement(
          'div',
          { id: 'top-bar-create-notebook' },
          React.createElement(NotebookNew, { createNotebook: this.props.createNotebook
          })
        ),
        React.createElement(
          'ul',
          null,
          this.props.notebooks.data.map(createNotebookListItem)
        )
      );
    }
  }]);

  return NotebookList;
}(React.Component);

var NotebookListContainer = ReactRedux.connect(function (state) {
  return {
    notebooks: state.notebooks,
    activeNotebookId: state.notebooks.activeNotebookId,
    data: state.data,
    notes: state.notes
  };
}, createActionDispatchers(notebooksActionCreators, notesActionCreators))(NotebookList);

module.exports = NotebookListContainer;

},{"../helpers/createActionDispatchers":18,"../reducers/notebooks":21,"../reducers/notes":22,"./ActiveNotebook":2,"./Notebook":10,"./NotebookNew":13,"lodash":"lodash","react":"react","react-redux":"react-redux"}],13:[function(require,module,exports){
'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var React = require('react');
var NotebookEdit = require('./NotebookEdit');

/**
 * A button which expands into a form for writing a new post.
 */

var NotebookNew = function (_React$Component) {
  _inherits(NotebookNew, _React$Component);

  function NotebookNew(props) {
    _classCallCheck(this, NotebookNew);

    // Set initial internal state for this component
    var _this = _possibleConstructorReturn(this, (NotebookNew.__proto__ || Object.getPrototypeOf(NotebookNew)).call(this, props));

    _this.state = { editing: false };
    return _this;
  }

  _createClass(NotebookNew, [{
    key: 'render',
    value: function render() {
      var _this2 = this;

      var openEdit = function openEdit() {
        _this2.setState({ editing: true });
      };

      var closeEdit = function closeEdit() {
        _this2.setState({ editing: false });
      };

      var createNotebook = function createNotebook(NewNotebook) {
        _this2.props.createNotebook(NewNotebook, function (err) {
          if (!err) closeEdit();
        });
      };

      // TODO Section 7: Write code to switch to create New not edit mode when editing is clicked
      if (this.state.editing) {
        // Render component for editing the post
        return React.createElement(NotebookEdit, {
          Notebook: this.props.Notebook,
          onSave: createNotebook,
          onCancel: closeEdit
        });
      }

      return React.createElement(
        'button',
        { className: 'blog-load-more btn btn-primary btn-lg',
          onClick: openEdit
        },
        '+NewNotebook'
      );
    }
  }]);

  return NotebookNew;
}(React.Component);

module.exports = NotebookNew;

},{"./NotebookEdit":11,"react":"react"}],14:[function(require,module,exports){
'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var React = require('react');
var moment = require('moment');
//const NoteList = require('./NoteList');
var NoteNew = require('./NoteNew');

var NotebookView = function (_React$Component) {
  _inherits(NotebookView, _React$Component);

  function NotebookView(props) {
    _classCallCheck(this, NotebookView);

    return _possibleConstructorReturn(this, (NotebookView.__proto__ || Object.getPrototypeOf(NotebookView)).call(this, props));
  }

  _createClass(NotebookView, [{
    key: 'render',
    value: function render() {
      var _this2 = this;

      var onClickNotebook = function onClickNotebook(event) {
        event.preventDefault();
        console.log(_this2.props.notebook.id);
        _this2.props.loadData(_this2.props.notebook.id);
        _this2.props.setActive(_this2.props.notebook.id); // added to test active notebook
      };

      var DeleteNotebook = function DeleteNotebook(event) {
        event.preventDefault();
        _this2.props.onDelete(_this2.props.notebook.id);
      };

      return React.createElement(
        'div',
        { className: 'blog-notebook' },
        React.createElement(
          'h3',
          { className: 'blog-notebook-title' },
          React.createElement(
            'a',
            { onClick: onClickNotebook },
            React.createElement(
              'li',
              null,
              this.props.notebook.title
            )
          ),
          React.createElement(
            'button',
            { onClick: DeleteNotebook, className: 'btn btn-danger' },
            React.createElement(
              'i',
              { className: 'fa fa-trash' },
              ' Delete'
            )
          )
        )
      );
    }
  }]);

  return NotebookView;
}(React.Component);

module.exports = NotebookView;

},{"./NoteNew":8,"moment":"moment","react":"react"}],15:[function(require,module,exports){
'use strict';

/**
 * The root React component from which all other components on the page are
 * descended. It is this component which is directly mounted on the DOM.
 */

var React = require('react');
var ReactRedux = require('react-redux');

var Provider = ReactRedux.Provider;
var Home = require('./Home');

// Enable development tools when in development mode
var DevTools = 'span';
if ("development" === 'development') {
  DevTools = require('./DevTools');
}

// Define the Root component
var Root = function Root(props) {
  return (
    /* The Provider gives descendants the ability to connect to the Redux store */
    React.createElement(
      Provider,
      { store: props.store },
      React.createElement(
        'div',
        null,
        React.createElement(Home, null),
        React.createElement(DevTools, null)
      )
    )
  );
};

module.exports = Root;

},{"./DevTools":3,"./Home":4,"react":"react","react-redux":"react-redux"}],16:[function(require,module,exports){
'use strict';

/**
 * This helper file provides a set of functions for performing HTTP requests.
 * It will work on both the backend and the frontend.
 */

var ajax = {};

if (true) {
  ajax.request = function (opts) {
    return new Promise(function (resolve, reject) {
      var xhr = new XMLHttpRequest();
      xhr.addEventListener('error', function () {
        reject(new Error('Request failed'));
      });
      xhr.addEventListener('load', function () {
        if (xhr.status !== 200) {
          reject(new Error('Received status ' + xhr.status));
        } else {
          resolve(opts.json ? JSON.parse(xhr.responseText) : xhr.responseText);
        }
      });
      xhr.open(opts.method, opts.url);
      if (opts.json) {
        xhr.setRequestHeader('Content-Type', 'application/json');
        xhr.send(opts.data !== undefined ? JSON.stringify(opts.data) : opts.data);
      } else {
        xhr.send(opts.data);
      }
    });
  };
} else {
  var request = require('request');

  ajax.request = function (opts) {
    return new Promise(function (resolve, reject) {
      request({
        url: opts.url,
        method: opts.method,
        body: opts.data,
        json: opts.json
      }, function (error, response, body) {
        if (error) {
          reject(error);
        } else if (response.statusCode !== 200) {
          reject(new Error('Received status ' + response.statusCode));
        } else {
          resolve(body);
        }
      });
    });
  };
}

module.exports = ajax;

},{"request":"request"}],17:[function(require,module,exports){
'use strict';

/**
 * This helper file provides a set of functions for communicating with the
 * backend API. It will work on both the backend and the frontend.
 */

var ajax = require('./ajax');

var api = {};

if (true) {
  api.baseUrl = '/api';
} else {
  api.baseUrl = 'http://api:3000';
}

api.get = function (path) {
  return ajax.request({
    method: 'GET',
    url: this.baseUrl + path,
    json: true
  });
};

api.post = function (path, data) {
  return ajax.request({
    method: 'POST',
    url: this.baseUrl + path,
    json: true,
    data: data
  });
};

api.put = function (path, data) {
  return ajax.request({
    method: 'PUT',
    url: this.baseUrl + path,
    json: true,
    data: data
  });
};

api.delete = function (path) {
  return ajax.request({
    method: 'DELETE',
    url: this.baseUrl + path,
    json: true
  });
};

module.exports = api;

},{"./ajax":16}],18:[function(require,module,exports){
'use strict';

/**
 * Returns a function that, when given a dispatch function, returns an
 * object containing a bunch of action dispatchers.
 */
var createActionDispatchers = function createActionDispatchers() {
  for (var _len = arguments.length, actionCreatorGroups = Array(_len), _key = 0; _key < _len; _key++) {
    actionCreatorGroups[_key] = arguments[_key];
  }

  return function (dispatch) {
    return (
      // Iterate over actionCreatorsArray, which is an array of arrays of action
      // creators
      actionCreatorGroups.reduce(function (actionDispatchers, actionCreators) {
        // Add an action dispatcher for each action creator in actionCreators
        Object.keys(actionCreators).filter(function (name) {
          return typeof actionCreators[name] === 'function';
        }).forEach(function (name) {
          actionDispatchers[name] = function () {
            for (var _len2 = arguments.length, actionCreatorArgs = Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
              actionCreatorArgs[_key2] = arguments[_key2];
            }

            return dispatch(actionCreators[name].apply(this, actionCreatorArgs));
          };
        });
        return actionDispatchers;
      }, {})
    );
  };
};

module.exports = createActionDispatchers;

},{}],19:[function(require,module,exports){
'use strict';

/**
 * This helper file provides a function for creating the Redux store. In
 * development mode it will also connect up the Redux development tools for
 * debugging purposes.
 */

var Redux = require('redux');
var reduxThunk = require('redux-thunk').default;
var combinedReducers = require('../reducers');

var finalCreateStore = void 0;

if ("development" === 'production') {
  finalCreateStore = Redux.compose(
  // Enables middleware
  Redux.applyMiddleware(reduxThunk))(Redux.createStore);
} else {
  var DevTools = require('../components/DevTools');

  finalCreateStore = Redux.compose(
  // Enables middleware
  Redux.applyMiddleware(reduxThunk),
  // Enables DevTools
  DevTools.instrument())(Redux.createStore);
}

module.exports = function (initialState) {
  return finalCreateStore(combinedReducers, initialState);
};

},{"../components/DevTools":3,"../reducers":20,"redux":"redux","redux-thunk":"redux-thunk"}],20:[function(require,module,exports){
'use strict';

/**
 * Specify all of your reducers in this file, so they can be combined into
 * one big reducer.
 */

var Redux = require('redux');

module.exports = Redux.combineReducers({
  notebooks: require('./notebooks'),
  notes: require('./notes')
  /* *** TODO: Put any other reducers in here *** */
  // eg. `notes: require('./notes')` if you have a reducer in reducers/notes.js
});

},{"./notebooks":21,"./notes":22,"redux":"redux"}],21:[function(require,module,exports){
'use strict';

var _ = require('lodash');
var api = require('../helpers/api');
var notesActionReducer = require('./notes');

// Action type constants
/* *** TODO: Put action constants here *** */
var SET_ACTIVE = 'blog-frontend/notebooks/SET_ACTIVE';
var INSERT = 'blog-frontend/notebooks/INSERT';
var REMOVE = 'blog-frontend/notebooks/REMOVE';

var initialState = {
  data: [{ id: 100, title: 'From Redux Store: A hard-coded notebook' }, { id: 101, title: 'From Redux Store: Another hard-coded notebook' }],
  activeNotebookId: -1,
  notes: []
};

// Function which takes the current data state and an action,
// and returns a new state
function reducer(state, action) {
  state = state || initialState;
  action = action || {};

  switch (action.type) {
    /* *** TODO: Put per-action code here *** */
    case INSERT:
      {
        var unsortedNotebooks = _.concat(state.data, action.notebooks);
        var data = _.orderBy(unsortedNotebooks, 'createdAt', 'desc');
        // Return updated state
        return _.assign({}, state, { data: data });
      }

    case REMOVE:
      {
        var _data = _.reject(state.data, { id: action.id });
        return _.assign({}, state, { data: _data });
      }

    case SET_ACTIVE:
      {
        console.log('activeNotebookId  ' + state.activeNotebookId);
        return _.assign({}, state, { activeNotebookId: action.notebookId });
      }

    default:
      return state;
  }
}

// Action creators
/* *** TODO: Put action creators here *** */
// Inserts notebooks into the NotebookList
reducer.insertNotebooks = function (notebooks) {
  return { type: INSERT, notebooks: notebooks };
};

// Removes a post from the visible post list
reducer.removeNotebook = function (id) {
  return { type: REMOVE, id: id };
};

reducer.setActive = function (notebookId) {
  //console.log(id);
  return { type: SET_ACTIVE, notebookId: notebookId };
};

// Attempts to save notebook in server/database and inserts it in data to display
// in front end
reducer.createNotebook = function (newNotebook, callback) {
  return function (dispatch) {
    api.post('/notebooks', newNotebook).then(function (notebook) {
      // This Notebook is one that the store returns us! It has Notebook id incremented to the next available id
      dispatch(reducer.insertNotebooks([notebook]));
      console.log('createNotebook in notebooks');
      callback();
    }).catch(function () {
      alert('Failed to create Notebook "FROM notebooks REDUCER". Are all of the fields filled in correctly?');
    });
  };
};

// Attempts to delete a notebook from the server and removes it from the data
// Notebook list if successful
reducer.deleteNotebook = function (id) {
  return function (dispatch) {
    api.delete('/notebooks/' + id).then(function (notebook) {
      dispatch(reducer.removeNotebook(id));
    }).catch(function () {
      alert('Failed to delete Notebook.  Are all of the fields filled in correctly?');
    });
  };
};

reducer.loadData = function (notebookId) {
  return function (dispatch) {
    console.log('/notebooks/' + notebookId + '/notes');
    dispatch(notesActionReducer.loadNotes(notebookId));
    //dispatch({ type: SET_ACTIVE, notebookId });
  };
};
/*reducer.loadData = (notebookId) => {
	return (dispatch) => {
      dispatch({ type: SET_ACTIVE, notebookId });
      dispatch(notesActionReducer.loadNotes(notebookId));
  };
};*/
// Export the action creators and reducer
module.exports = reducer;

},{"../helpers/api":17,"./notes":22,"lodash":"lodash"}],22:[function(require,module,exports){
'use strict';

var _ = require('lodash');
var api = require('../helpers/api');
var notesbooksActionReducer = require('./notebooks');

var FETCH = 'blog-frontend/notes/FETCH';
var GET_NOTES = 'blog-frontend/notebooks/GET_NOTES';
var INSERT = 'blog-frontend/notes/INSERT';
var CHANGE = 'blog-frontend/notes/CHANGE';
var REMOVE = 'blog-frontend/notes/REMOVE';

var initialState = {
  notes: [],
  notebookId: -1
};

function reducer(state, action) {
  state = state || initialState;
  action = action || {};

  switch (action.type) {
    /* *** TODO: Put per-action code here *** */
    case INSERT:
      {
        var unsortedNotes = _.concat(state.notes, action.note);
        var visibleNotes = _.orderBy(unsortedNotes, 'createdAt', 'desc');
        // Return updated state
        return _.assign({}, state, { notes: visibleNotes });
      }

    case GET_NOTES:
      {
        var notes = _.orderBy(action.notes, 'createdAt', 'desc');
        return _.assign({}, state, { notes: notes, notebookId: action.notebookId });
      }

    case CHANGE:
      {
        var _notes = _.clone(state.notes);
        var changedIndex = _.findIndex(state.notes, { id: action.note.id });
        _notes[changedIndex] = action.note;
        return _.assign({}, state, { notes: _notes });
      }

    // Removes a single post from the visible post list
    case REMOVE:
      {
        var _notes2 = _.reject(state.notes, { id: action.id });
        return _.assign({}, state, { notes: _notes2 });
      }

    default:
      return state;
  }
}

// Action creators
/* *** TODO: Put action creators here *** */
reducer.insertNotes = function (note) {
  return { type: INSERT, note: note };
};

// Changes local post data
reducer.changeNote = function (note) {
  return { type: CHANGE, note: note };
};

// Delete Note
// Removes a post from the visible note list
reducer.removeNote = function (id) {
  return { type: REMOVE, id: id };
};

// Attempts to delete a post from the server and removes it from the visible
// post list if successful
reducer.deleteNote = function (noteId) {
  // TODO Section 8: Add code to perform delete
  return function (dispatch) {
    api.delete('/notes/' + noteId).then(function () {
      dispatch(reducer.removeNote(noteId));
    }).catch(function () {
      alert('Failed to delete note.  Are all of the fields filled in correctly?');
    });
  };
};

// Attempts to update a post on the server and updates local post data if
// successful
reducer.saveNote = function (editedNote, callback) {
  return function (dispatch) {
    api.put('/notes/' + editedNote.id, editedNote).then(function (note) {
      // Saves local post.
      dispatch(reducer.changeNote(note));
      callback();
    }).catch(function () {
      alert('Failed to save post.  Are all of the fields filled in correctly?');
    });
  };
};
// Attempts to save note in server/database and inserts it in data to display
// in front end
reducer.createNote = function (note, callback) {
  return function (dispatch) {
    api.post('/notes', note).then(function (note) {
      //console.log(newNoteId);
      // This Notebook is one that the store returns us! It has Notebook id incremented to the next available id
      dispatch(reducer.insertNotes(note));
      //callback();
    }).catch(function (err) {
      return alert(err.message);
    });
  };
};

// Method to load notes which is called via notebooks reducer
reducer.loadNotes = function (notebookId) {
  return function (dispatch) {
    api.get('/notebooks/' + notebookId + '/notes').then(function (notes) {
      dispatch({ type: GET_NOTES, notebookId: notebookId, notes: notes });
    }).catch(function (error) {
      error;
    });
  };
};

// Action creator for loading an notebook's notes
module.exports = reducer;

},{"../helpers/api":17,"./notebooks":21,"lodash":"lodash"}]},{},[1])

//# sourceMappingURL=/assets/js/app.js.map
