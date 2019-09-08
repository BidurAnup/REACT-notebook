const express = require('express');
const _ = require('lodash');
const models = require('../models');

const router = express.Router();

//// This helper function takes the JSON object submitted in a request and
// selects only the fields that are allowed to be set by users
function notebookFilter(obj) {
  return _.pick(obj, ['title']);
}

// Index
//GET /notebooks
// Already done by Professor/Tutor
router.get('/', (req, res) => {
  models.Notebook.findAll({ order: [['createdAt', 'DESC']] })
    .then(notebooks => res.json(notebooks))
    .catch(err => res.status(500).json({ error: err.message }));
});


/* *** TODO: Fill in the API endpoints for notebooks *** */

// GET /notebooks/:notebookId/notes
//Returns a list of all notes for a particular notebook.
router.get('/:notebookId/notes', (req, res) =>{
models.Note.findAll({where : {notebookId: req.params.notebookId}})
.then(notes => res.json(notes))
.catch(err => res.status(500).json({ error: err.message }));
})


//POST /notebooks
// Creates a new notebook using the posted data. Returns the
//new notebook.
router.post('/', (req, res) => {
  // Create a new notebook record in the database
  models.Notebook.create(notebookFilter(req.body))
    .then(notebook => res.json(notebook))
    .catch(err => res.status(422).json({error: err.message }));
});

// GET /notebooks/:notebookId
//Returns a single notebook by ID.
// Show
router.get('/:notebookId', (req, res) => {
// Return the specified notebook record from the database
models.Notebook.findById(req.params.notebookId)
.then(notebook => res.json(notebook))
.catch(err => res.status(500).json({ error: err.message }));
});


// DELETE /notebooks/:notebookId
//Deletes a single notebook by ID. All of the notebook’s
//notes shall be deleted also. Returns an empty object, {}.
// Destroy
router.delete('/:notebookId', (req, res) => {
// Delete the specified notebook from the database
// Not sure if it deletes the notes too or not
models.Notebook.destroy({ where: { id: req.params.notebookId } })
.then(() => res.json({}))
.catch(err => res.status(500).json({ error: err.message }));
});


// PUT /notebooks/:notebookId
// Updates the attributes of a particular notebook. Returns
// the updated notebook.
// Update
router.put('/:notebookId', (req, res) => {
  // Update the specified notebook record in the database
  models.Notebook.findById(req.params.notebookId)
    .then(notebook => notebook.update(notebookFilter(req.body)))
    .then(notebook => res.json(notebook))
    .catch(err => res.status(422).json({ error: err.message }));
});

module.exports = router;