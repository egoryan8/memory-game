import Navigation from '@/components/Navigation/Navigation'
import * as React from 'react'
import styles from './LeaderBoard.module.scss'
import {
  Table,
  TableBody,
  TableCell,
  TableHeaderCell,
  TableRow,
} from '@/components/Table/Table'

interface Leader {
  position: number
  player: string
  score: number
}

const leaders: Leader[] = [
  {
    position: 1,
    player: 'Игрок 1',
    score: 1990,
  },
  {
    position: 2,
    player: 'Игрок 2',
    score: 1990,
  },
  {
    position: 3,
    player: 'Игрок 3',
    score: 1990,
  },
]

const LeaderBoard = () => {
  const rows = leaders.map(leader => (
    <TableRow>
      <TableCell>{leader.position}</TableCell>
      <TableCell>{leader.player}</TableCell>
      <TableCell>{leader.score}</TableCell>
    </TableRow>
  ))

  return (
    <div className={styles.leaderboard}>
      <Navigation />
      <div className={styles.leaderboard__table}>
        <Table>
          <TableRow>
            <TableHeaderCell>Позиция</TableHeaderCell>
            <TableHeaderCell>Игрок</TableHeaderCell>
            <TableHeaderCell>Очки</TableHeaderCell>
          </TableRow>
          <TableBody>{rows}</TableBody>
        </Table>
      </div>
    </div>
  )
}

export default LeaderBoard
