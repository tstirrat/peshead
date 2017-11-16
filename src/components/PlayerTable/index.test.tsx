import * as React from 'react';
import { render } from 'react-dom';

import { base } from '../../__test__/fixtures';
import { Player } from '../../shared/service/api';

import { PlayerTable } from './index';
import { StaticRouter } from 'react-router';

const player1 = Player.create({ ...base, id: 'a', name: 'Player 1', age: 21 });
const player2 = Player.create({ ...base, id: 'b', name: 'Player 2', age: 35 });

const players = [player1, player2];

const context = {};

it('displays all given players', () => {
  const div = document.createElement('div');
  render(
    <StaticRouter location="/search?query=test" context={context}>
      <PlayerTable players={players} />
    </StaticRouter>,
    div);
  expect(div.querySelectorAll('tbody tr').length).toBe(players.length);
});

it('displays player name', () => {
  const div = document.createElement('div');
  render(
    <StaticRouter location="/search?query=test" context={context}>
      <PlayerTable players={players} />
    </StaticRouter>,
    div);
  expect(div.querySelector('tbody tr td')!.textContent).toBe(player1.name);
});

it('displays player age', () => {
  const div = document.createElement('div');
  render(
    <StaticRouter location="/search?query=test" context={context}>
      <PlayerTable players={players} />
    </StaticRouter>,
    div);
  expect(div.querySelector('tbody .age')!.textContent).toBe(player1.age.toString());
});

it('displays player position', () => {
  const div = document.createElement('div');
  render(
    <StaticRouter location="/search?query=test" context={context}>
      <PlayerTable players={players} />
    </StaticRouter>,
    div);
  expect(div.querySelector('tbody .pos')!.textContent)
    .toBe(player1.registeredPosition.toString());
});

it('displays player nationality', () => {
  const div = document.createElement('div');
  render(
    <StaticRouter location="/search?query=test" context={context}>
      <PlayerTable players={players} />
    </StaticRouter>,
    div);
  expect(div.querySelector('tbody .nation')!.textContent)
    .toBe(player1.nationality.toString());
});

it('displays player OVR', () => {
  const div = document.createElement('div');
  render(
    <StaticRouter location="/search?query=test" context={context}>
      <PlayerTable players={players} />
    </StaticRouter>,
    div);
  expect(div.querySelector('tbody .ovr')!.textContent)
    .toBe(player1.abilities!.attackingProwess!.toString());
  // TODO: wire up real stats when we have them
});

it('displays player SHT', () => {
  const div = document.createElement('div');
  render(
    <StaticRouter location="/search?query=test" context={context}>
      <PlayerTable players={players} />
    </StaticRouter>,
    div);
  expect(div.querySelector('tbody .sht')!.textContent)
    .toBe(player1.abilities!.finishing!.toString());
  // TODO: wire up real stats when we have them
});

it('displays player PAS', () => {
  const div = document.createElement('div');
  render(
    <StaticRouter location="/search?query=test" context={context}>
      <PlayerTable players={players} />
    </StaticRouter>,
    div);
  expect(div.querySelector('tbody .pas')!.textContent)
    .toBe(player1.abilities!.lowPass!.toString());
  // TODO: wire up real stats when we have them
});

it('displays player DRI', () => {
  const div = document.createElement('div');
  render(
    <StaticRouter location="/search?query=test" context={context}>
      <PlayerTable players={players} />
    </StaticRouter>,
    div);
  expect(div.querySelector('tbody .dri')!.textContent)
    .toBe(player1.abilities!.dribbling!.toString());
  // TODO: wire up real stats when we have them
});

it('displays player DEF', () => {
  const div = document.createElement('div');
  render(
    <StaticRouter location="/search?query=test" context={context}>
      <PlayerTable players={players} />
    </StaticRouter>,
    div);
  expect(div.querySelector('tbody .def')!.textContent)
    .toBe(player1.abilities!.defensiveProwess!.toString());
  // TODO: wire up real stats when we have them
});

it('displays player PHY', () => {
  const div = document.createElement('div');
  render(
    <StaticRouter location="/search?query=test" context={context}>
      <PlayerTable players={players} />
    </StaticRouter>,
    div);
  expect(div.querySelector('tbody .phy')!.textContent)
    .toBe(player1.abilities!.physicalContact!.toString());
  // TODO: wire up real stats when we have them
});
