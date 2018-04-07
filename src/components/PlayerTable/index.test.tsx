import * as React from 'react';
import { render } from 'react-dom';

import { PlayerTable } from '.';
import { StaticRouter } from '../../__test__';
import { base } from '../../__test__/fixtures';
import { Player } from '../../shared/service/api';

const player1 = Player.create({ ...base, id: 'a', name: 'Player 1', age: 21 });
const player2 = Player.create({ ...base, id: 'b', name: 'Player 2', age: 35 });

const players = [player1, player2];

let div: HTMLDivElement;

describe('<PlayerTable>', () => {
  beforeEach(() => {
    div = document.createElement('div');
    render(
      <StaticRouter url="/players/1">
        <PlayerTable players={players} />
      </StaticRouter>,
      div
    );
  });

  it('displays all given players', () => {
    expect(div.querySelectorAll('tbody tr').length).toBe(players.length);
  });

  it('displays player name', () => {
    expect(div.querySelector('tbody tr td')!.textContent).toBe(player1.name);
  });

  it('displays player age', () => {
    expect(div.querySelector('tbody .age')!.textContent).toBe(
      player1.age.toString()
    );
  });

  it('displays player position', () => {
    expect(div.querySelector('tbody .pos')!.textContent).toBe('RWF');
  });

  it('displays player nationality', () => {
    expect(div.querySelector('tbody .nation')!.textContent).toBe(
      player1.nationality.toString()
    );
  });

  it('displays player OVR', () => {
    expect(div.querySelector('tbody .ovr')!.textContent).toBe(
      player1.ovr.toString()
    );
    // TODO: wire up real stats when we have them
  });

  it('displays player SHT', () => {
    expect(div.querySelector('tbody .sht')!.textContent).toBe(
      player1.abilities!.finishing!.toString()
    );
    // TODO: wire up real stats when we have them
  });

  it('displays player PAS', () => {
    expect(div.querySelector('tbody .pas')!.textContent).toBe(
      player1.abilities!.lowPass!.toString()
    );
    // TODO: wire up real stats when we have them
  });

  it('displays player DRI', () => {
    expect(div.querySelector('tbody .dri')!.textContent).toBe(
      player1.abilities!.dribbling!.toString()
    );
    // TODO: wire up real stats when we have them
  });

  it('displays player DEF', () => {
    expect(div.querySelector('tbody .def')!.textContent).toBe(
      player1.abilities!.defensiveProwess!.toString()
    );
    // TODO: wire up real stats when we have them
  });

  it('displays player PHY', () => {
    expect(div.querySelector('tbody .phy')!.textContent).toBe(
      player1.abilities!.physicalContact!.toString()
    );
    // TODO: wire up real stats when we have them
  });
});
