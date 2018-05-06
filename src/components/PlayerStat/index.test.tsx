import * as React from 'react';
import { render } from 'react-dom';

import { PlayerStat } from '.';

describe('<PlayerStat>', () => {
  it('displays [value] inside a .t-stat element', () => {
    const div = document.createElement('div');
    render(<PlayerStat value={10} />, div);
    expect(div.querySelector('.t-stat')!.textContent).toBe('10');
  });

  describe('coloring', () => {
    it('marks 96 stat as .max', () => {
      const div = document.createElement('div');
      render(<PlayerStat value={96} />, div);
      expect(div.querySelector('.max')).toBeDefined();
    });

    it('marks > 96 stat as .max', () => {
      const div = document.createElement('div');
      render(<PlayerStat value={99} />, div);
      expect(div.querySelector('.max')).toBeDefined();
    });

    it('marks 90 stat as .very-strong', () => {
      const div = document.createElement('div');
      render(<PlayerStat value={90} />, div);
      expect(div.querySelector('.very-strong')).toBeDefined();
    });

    it('marks > 90 stat as .very-strong', () => {
      const div = document.createElement('div');
      render(<PlayerStat value={95} />, div);
      expect(div.querySelector('.very-strong')).toBeDefined();
    });

    it('marks 80 stat as .strong', () => {
      const div = document.createElement('div');
      render(<PlayerStat value={80} />, div);
      expect(div.querySelector('.strong')).toBeDefined();
    });

    it('marks > 80 stat as .strong', () => {
      const div = document.createElement('div');
      render(<PlayerStat value={89} />, div);
      expect(div.querySelector('.strong')).toBeDefined();
    });

    it('marks 70 stat as .average', () => {
      const div = document.createElement('div');
      render(<PlayerStat value={70} />, div);
      expect(div.querySelector('.average')).toBeDefined();
    });

    it('marks > 70 stat as .average', () => {
      const div = document.createElement('div');
      render(<PlayerStat value={79} />, div);
      expect(div.querySelector('.average')).toBeDefined();
    });

    it('marks 60 stat as .weak', () => {
      const div = document.createElement('div');
      render(<PlayerStat value={60} />, div);
      expect(div.querySelector('.weak')).toBeDefined();
    });

    it('marks > 60 stat as .weak', () => {
      const div = document.createElement('div');
      render(<PlayerStat value={69} />, div);
      expect(div.querySelector('.weak')).toBeDefined();
    });

    it('marks 0 stat as .very-weak', () => {
      const div = document.createElement('div');
      render(<PlayerStat value={0} />, div);
      expect(div.querySelector('.very-weak')).toBeDefined();
    });

    it('marks 40 stat as .very-weak', () => {
      const div = document.createElement('div');
      render(<PlayerStat value={40} />, div);
      expect(div.querySelector('.very-weak')).toBeDefined();
    });

    it('marks > 0 stat as .very-weak', () => {
      const div = document.createElement('div');
      render(<PlayerStat value={59} />, div);
      expect(div.querySelector('.very-weak')).toBeDefined();
    });
  }); // coloring
});
