import { Game, Frame } from './bowling';

describe('Frame', () => {
  describe('a strike',()=>{
    test('with no following rolls', () => {
      const laFrame = new Frame(10);
      expect(laFrame.score()).toBe(10);
      expect(laFrame.isComplete()).toBeTruthy();
      expect(laFrame.isScoreComplete()).toBeFalsy();
      expect(laFrame.isStrike()).toBeTruthy();
    })
  
    test('with 1 following roll', () => {
      const laFrame = new Frame(10, 2);
      expect(laFrame.score()).toBe(12);
      expect(laFrame.isComplete()).toBeTruthy();
      expect(laFrame.isScoreComplete()).toBeFalsy();
      expect(laFrame.isStrike()).toBeTruthy();
    })
  
    test('with 2 following rolls', () => {
      const laFrame = new Frame(10, 2, 3);
      expect(laFrame.score()).toBe(15);
      expect(laFrame.isComplete()).toBeTruthy();
      expect(laFrame.isScoreComplete()).toBeTruthy();
      expect(laFrame.isStrike()).toBeTruthy();
    })
  })

  describe('a spare',()=>{
    test('with no following rolls', () => {
      const laFrame = new Frame(7, 3);
      expect(laFrame.score()).toBe(10);
      expect(laFrame.isComplete()).toBeTruthy();
      expect(laFrame.isScoreComplete()).toBeFalsy();
      expect(laFrame.isSpare()).toBeTruthy();
    })
  
    test('with 1 following roll', () => {
      const laFrame = new Frame(7, 3, 1);
      expect(laFrame.score()).toBe(11);
      expect(laFrame.isComplete()).toBeTruthy();
      expect(laFrame.isScoreComplete()).toBeTruthy();
      expect(laFrame.isSpare()).toBeTruthy();
    })
  
    test('with 2 following rolls', () => {
      const laFrame = new Frame(7, 3, 1, 5);
      expect(laFrame.score()).toBe(11);
      expect(laFrame.isComplete()).toBeTruthy();
      expect(laFrame.isScoreComplete()).toBeTruthy();
      expect(laFrame.isSpare()).toBeTruthy();
    })
  })

  describe('an open frame',()=>{
    test('with two rolls', () => {
      const laFrame = new Frame(7, 2);
      expect(laFrame.score()).toBe(9);
      expect(laFrame.isComplete()).toBeTruthy();
      expect(laFrame.isScoreComplete()).toBeTruthy();
      expect(laFrame.isStrike()).toBeFalsy();
    })
  
    test('with only 1 roll', () => {
      const laFrame = new Frame(7);
      expect(laFrame.score()).toBe(7);
      expect(laFrame.isComplete()).toBeFalsy();
      expect(laFrame.isScoreComplete()).toBeFalsy();
      expect(laFrame.isStrike()).toBeFalsy();
    })
  })
})

describe('Game', () => {
  test('a game with no pins knocked down', () => {
    const laGame = new Game();
    for(let i = 0; i < 12; i ++){
      laGame.roll(0);
    }
    expect(laGame.score()).toBe(0);
  })

  test('a game starting with 3 strikes', () => {
    const laGame = new Game();
    laGame.roll(10);
    laGame.roll(10);
    laGame.roll(10);
    expect(laGame.score()).toBe(60);
  })

  test('a game with a mix of strikes, spares, and open frames', () => {
    const laGame = new Game();
    laGame.roll(10);
    laGame.roll(7);
    laGame.roll(2);
    laGame.roll(9);
    laGame.roll(1);
    laGame.roll(3);
    laGame.roll(5);
    expect(laGame.score()).toBe(49);
  })

  test('a game with a strike on all frames', () => {
    const laGame = new Game();
    for(let i = 0; i < 12; i ++){
      laGame.roll(10);
    }
    expect(laGame.score()).toBe(300);
  })
})
