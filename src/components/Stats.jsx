import React, { useState } from 'react'
import { Button, Modal } from 'react-bootstrap'
import { IoDiamondOutline } from 'react-icons/io5'

const Stats = ({ data, teraType, currentTypes, useLocation }) => {
  const [show, setShow] = useState(false)

  const handleClose = () => setShow(false)
  const handleShow = () => setShow(true)

  const includesType = (types, targetTypes) =>
    Array.isArray(types) && types.some((type) => targetTypes.includes(type))

  const psychic = includesType(data.types, ['psychic'])
  const ghost = includesType(data.types, ['ghost'])
  const fire = includesType(data.types, ['fire'])
  const water = includesType(data.types, ['water'])
  const ice = includesType(data.types, ['ice'])
  const electric = includesType(data.types, ['electric'])
  const fight = includesType(data.types, ['fighting', 'ground'])
  const ground = includesType(data.types, ['ground'])
  const rock = includesType(data.types, ['rock'])
  const grass = includesType(data.types, ['grass'])
  const bug = includesType(data.types, ['bug'])
  const dark = includesType(data.types, ['dark'])
  const poison = includesType(data.types, ['poison'])
  const steel = includesType(data.types, ['steel'])
  const fairy = includesType(data.types, ['fairy'])
  const normal = includesType(data.types, ['normal'])
  const flying = includesType(data.types, ['flying'])
  const dragon = includesType(data.types, ['dragon'])

  const modalBackgroundColor = teraType
    ? teraType === 'steel'
      ? 'gray'
      : teraType === 'psychic'
      ? '#C81250'
      : teraType === 'ghost'
      ? '#4E2093'
      : teraType === 'fire'
      ? 'red'
      : teraType === 'ice'
      ? '#A4D8D8'
      : teraType === 'water'
      ? '#0094D9'
      : teraType === 'electric'
      ? '#EABD00'
      : teraType === 'fighting'
      ? '#C2590F'
      : teraType === 'ground'
      ? '#A26D00'
      : teraType === 'poison'
      ? '#5B0B63'
      : teraType === 'grass'
      ? 'green'
      : teraType === 'rock'
      ? '#C2590F'
      : teraType === 'bug'
      ? '#545500'
      : teraType === 'dark'
      ? 'black'
      : teraType === 'fairy'
      ? 'pink'
      : teraType === 'normal'
      ? 'lightgray'
      : teraType === 'dragon'
      ? '#486FCB'
      : teraType === 'flying'
      ? '#B2BBD1'
      : 'white'
    : steel
    ? 'gray'
    : psychic
    ? '#C81250'
    : ghost
    ? '#4E2093'
    : fire
    ? 'red'
    : ice
    ? '#A4D8D8'
    : water
    ? '#0094D9'
    : electric
    ? '#EABD00'
    : fight
    ? '#C2590F'
    : ground
    ? '#A26D00'
    : poison
    ? '#5B0B63'
    : grass
    ? 'green'
    : rock
    ? '#C2590F'
    : bug
    ? '#545500'
    : dark
    ? 'black'
    : fairy
    ? 'pink'
    : normal
    ? 'lightgray'
    : dragon
    ? '#486FCB'
    : flying
    ? '#B2BBD1'
    : 'white'

  return (
    <>
      <Button
        style={{
          backgroundColor: modalBackgroundColor,
          color: modalBackgroundColor === 'black' ? 'white' : 'dark',
          border:
            (data.types && data.types.includes('dark')) || teraType === 'dark'
              ? '1px solid white'
              : '1px solid black',
          marginTop: useLocation === '/masterTeams' ? '4vh' : '0',
        }}
        onClick={handleShow}
      >
        Show Stats
      </Button>

      <Modal className="my-modal" show={show} onHide={handleClose}>
        <Modal.Header
          style={{
            backgroundColor: modalBackgroundColor,
            color:
              modalBackgroundColor === 'black' ||
              modalBackgroundColor === '#5B0B63' ||
              modalBackgroundColor === '#4E2093' ||
              modalBackgroundColor === 'red'
                ? 'white'
                : 'dark',
          }}
          closeButton
          closeVariant={modalBackgroundColor === 'black' ? 'white' : 'dark'}
        >
          <Modal.Title>
            {' '}
            <img
              src={data.spriteStat || data.sprite}
              style={{ width: data.spriteStat ? 'auto' : '90px' }}
              alt="sprite"
            />
          </Modal.Title>
          <Modal.Title className="ms-5">{data.name.toUpperCase()}</Modal.Title>
        </Modal.Header>
        <Modal.Body
          style={{
            backgroundColor: modalBackgroundColor,
            color:
              modalBackgroundColor === 'black' ||
              modalBackgroundColor === '#5B0B63' ||
              modalBackgroundColor === '#4E2093' ||
              modalBackgroundColor === 'red'
                ? 'white'
                : 'dark',
          }}
        >
          <strong>
            Type:{' '}
            {data.types.join(', ').toUpperCase() +
              ' ' +
              'Teratype:' +
              (currentTypes[0] ? currentTypes[0].toUpperCase() : '')}
            <IoDiamondOutline />
          </strong>
          <p>
            <strong>Height:</strong> {data.height / 10} m
          </p>
          <p>
            <strong>Weight:</strong> {data.weight / 10} kg
          </p>
          <hr />
          <h5>Base Stats</h5>

          {data.stats && data.stats.length > 0 ? (
            data.stats.map((stat, index) => (
              <div key={index}>
                <p>
                  <strong>{stat.name}:</strong> {stat.value}
                </p>
              </div>
            ))
          ) : (
            <p>No stats available</p>
          )}
          <p>
            <strong className="fs-4">
              Total:
              {''}
              {data.stats.reduce((sum, stat) => sum + stat.value, 0)}
            </strong>
          </p>
        </Modal.Body>
        <Modal.Footer
          style={{
            backgroundColor: modalBackgroundColor,
            color:
              modalBackgroundColor === 'black' ||
              modalBackgroundColor === '#5B0B63' ||
              modalBackgroundColor === '#4E2093' ||
              modalBackgroundColor === 'red'
                ? 'white'
                : 'dark',
          }}
        >
          {' '}
          <strong className="fs-3 me-3">
            Abilities:{' '}
            {data.abilities.length > 0 ? data.abilities.join(', ') : 'N/A'}
          </strong>
        </Modal.Footer>
      </Modal>
    </>
  )
}

export default Stats
