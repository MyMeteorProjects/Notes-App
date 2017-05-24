import { Meteor } from 'meteor/meteor';
import expect from 'expect'; // assertion libary

import { Notes } from './notes';

if (Meteor.isServer){

  describe('notes', function(){

    const noteOne = {
      _id: 'testNoteId1',
      title: 'My Title',
      body: 'my body',
      updatedAt: 0,
      userId: 'testUserId1'
    };

    const noteTwo = {
      _id: 'testNoteId2',
      title: 'My Title 2',
      body: 'my body 2',
      updatedAt: 0,
      userId: 'testUserId2'
    };
    const noteThree = {
      _id: 'testNoteId3',
      title: null,
      body: null,
      updatedAt: null,
      userId: 'testUserId3'
    };

    beforeEach(function (){
      Notes.remove({}); // this resest the database but only in test mode it does not effect the real database
        Notes.insert(noteOne);
        Notes.insert(noteTwo);
    });

    //NOTES INSRET TESTS

    it('should insert new note', function(){
      const userId = 'testId'
      const _id = Meteor.server.method_handlers['notes.insert'].apply({ userId }) //this allows to use a method without exporting it

      expect(Notes.findOne({_id, userId })).toExist();

    });

    it('should not insert note if not authenticated', function(){
      expect(() => {
        Meteor.server.method_handlers['notes.insert']()
      }).toThrow()
    });

    //NOTES REMOVE TESTS

    it ('should remove note', function(){
        Meteor.server.method_handlers['notes.remove'].apply({userId: noteOne.userId }, [noteOne._id]);
        expect(Notes.findOne({_id: noteOne._id})).toNotExist();
    });

    it('should not remove not if unauthenticated', function(){
      expect(() => {
        Meteor.server.method_handlers['notes.remove'].apply({}, [noteOne._id])
      }).toThrow();
    })

    it('should not remove note if invalid _id', function () {
      expect(() => {
        Meteor.server.method_handlers['notes.remove'].apply({userId: noteOne.userId}, [])
      }).toThrow();
    });

    //NOTES UPDATE TESTS

    it('should update note', function(){
      const title = 'this is an updated title'
      Meteor.server.method_handlers['notes.update'].apply({
        userId: noteOne.userId}, [
        noteOne._id,
        { title }
      ]);
      const note = Notes.findOne(noteOne._id);
      expect(note.updatedAt).toBeGreaterThan(0);
      expect(note).toInclude({
        title, // es6 syntax
        body: noteOne.body
      });
    });
    it('should throw error if extra updates', function() {

    expect( ()=>{  Meteor.server.method_handlers['notes.update'].apply({
      userId: noteOne.userId}, [
      noteOne._id,
      { title: 'new title', name: 'yuda' }
      ]);
    }).toThrow();
  });

  it('should not update not if user was not the creator', function(){
    const title = 'this is an updated title'
    Meteor.server.method_handlers['notes.update'].apply({
      userId: 'testId'
    }, [
      noteOne._id,
      { title }
    ]);
    const note = Notes.findOne(noteOne._id);

    expect(note).toInclude(noteOne);
  });

  it('should not update not if unauthenticated', function(){
    expect(() => {
      Meteor.server.method_handlers['notes.update'].apply({}, [noteOne._id])
    }).toThrow();
  })

  it('should not update note if invalid _id', function () {
    expect(() => {
      Meteor.server.method_handlers['notes.update'].apply({userId: noteOne.userId}, [])
    }).toThrow();
  });

// PUBLICATION TESTS

  it('should return user notes', function(){
    const res = Meteor.server.publish_handlers.notes.apply({userId: noteOne.userId})
    const notes = res.fetch();

    expect(notes.length).toBe(1)
    expect(notes[0]).toEqual(noteOne)
  });

  it('should return no notes if user has no notes', function(){
    const res = Meteor.server.publish_handlers.notes.apply({userId: noteThree.userId})
    const notes = res.fetch();

    expect(notes.length).toBe(0)
  });

}); //end describe

}//end if
