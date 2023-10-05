import LeaderBoardApi from '@/api/LeaderBoardApi'
import { AppThunk } from '@/store'
import { setLeaders, setLeadersError } from '@/store/features/leaderBoardSlice'

const getLeaderBoardResults =
  (params: ILeaderBoardParams): AppThunk =>
  async dispatch => {
    try {
      const response = await LeaderBoardApi.getLeaderBoardResults(params)

      if (response.status === 200) {
        const leaderBoardData = await response.json()
        const formattedData = leaderBoardData.map(
          (item: { data: ILeaderBoardData }) => item.data
        )

        dispatch(setLeaders(formattedData))
      } else {
        const text = await response.text()

        dispatch(setLeadersError(`SET_LEADERS_FAILED: ${text}`))
      }
    } catch (error) {
      console.error('An error occurred:', error)
    }
  }

export default getLeaderBoardResults
