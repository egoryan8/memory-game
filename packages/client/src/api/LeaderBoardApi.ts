import HTTPClient from '@/utils/HTTPClient'

function LeaderBoardApi() {
  const client = HTTPClient('/leaderboard')

  const setLeaderBoardResult = async (data: Partial<ILeaderBoardResult>) => {
    const response = await client.post('/', { body: data as never })
    return response
  }

  const getLeaderBoardResults = async (data: Partial<ILeaderBoardParams>) => {
    const response = await client.post('/all', { body: data as never })
    return response
  }

  return Object.freeze({
    getLeaderBoardResults,
    setLeaderBoardResult,
  })
}

export default LeaderBoardApi()
