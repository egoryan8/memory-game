import HTTPClient from '@/utils/HTTPClient'

function LeaderBoardApi() {
  const client = HTTPClient('/leaderboard')

  const setLeaderBoardResult = async (data: Partial<ILeaderBoardResult>) =>
    await client.post('/', data)

  const getLeaderBoardResults = async (data: Partial<ILeaderBoardParams>) =>
    await client.post('/all', data)

  return Object.freeze({
    getLeaderBoardResults,
    setLeaderBoardResult,
  })
}

export default LeaderBoardApi()
