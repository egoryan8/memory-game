interface IUser {
  id?: number
  first_name: string
  second_name: string
  display_name?: string
  login?: string
  email?: string
  password?: string
  phone: string
  avatar?: string
}

interface ILogin {
  login: string
  password: string
}
interface IOAuthLogin {
  authCode: string
  redirectUri: string
}

interface IPassword {
  oldPassword: string
  newPassword: string
}

interface ILeaderBoardData {
  userData: IUser
  codeHuntersMemoryGameScore: number
}

interface ILeaderBoardResult {
  data: ILeaderBoardData
  ratingFieldName: string
}

interface ILeaderBoardParams {
  ratingFieldName: string
  cursor: number
  limit: number
}

interface IEmojiParams {
  userId: number
  topicId: number
  commentId: number
}

interface IEmojiResult {
  config: {
    userId: number
    topicId: number
    commentId: number
    emojiId: number
    emojiName: string
  }
  count: number
  isSelected: boolean
}

interface IEmojiData {
  userId: number
  topicId: number
  commentId: number
  emojiId: number
}

//
// Context
//

type Offset = [x: number, y: number] | number

interface CreateTextureOptions {
  /** The 2D shape to be drawn in a repeating grid with the specified spacing (if omitted, parallel lines will be used) */
  path?: Path2D

  /** The lineWidth with which to stroke the path (if omitted, the path will be filled instead) */
  line?: number

  /** The color to use for stroking/filling the path */
  color?: string

  /** The orientation of the pattern grid in radians */
  angle?: number

  /** The amount by which to shift the pattern relative to the canvas origin */
  offset?: Offset
}

type CanvasImageSource = Canvas | Image

interface CanvasDrawImage {
  drawImage(image: CanvasImageSource, dx: number, dy: number): void

  drawImage(
    image: CanvasImageSource,
    dx: number,
    dy: number,
    dw: number,
    dh: number
  ): void

  drawImage(
    image: CanvasImageSource,
    sx: number,
    sy: number,
    sw: number,
    sh: number,
    dx: number,
    dy: number,
    dw: number,
    dh: number
  ): void

  drawCanvas(image: Canvas, dx: number, dy: number): void

  drawCanvas(
    image: Canvas,
    dx: number,
    dy: number,
    dw: number,
    dh: number
  ): void

  drawCanvas(
    image: Canvas,
    sx: number,
    sy: number,
    sw: number,
    sh: number,
    dx: number,
    dy: number,
    dw: number,
    dh: number
  ): void
}

interface CanvasFillStrokeStyles {
  fillStyle: string | CanvasGradient | CanvasPattern | CanvasTexture
  strokeStyle: string | CanvasGradient | CanvasPattern | CanvasTexture

  createConicGradient(startAngle: number, x: number, y: number): CanvasGradient

  createLinearGradient(
    x0: number,
    y0: number,
    x1: number,
    y1: number
  ): CanvasGradient

  createRadialGradient(
    x0: number,
    y0: number,
    r0: number,
    x1: number,
    y1: number,
    r1: number
  ): CanvasGradient

  createPattern(
    image: CanvasImageSource,
    repetition: string | null
  ): CanvasPattern | null

  createTexture(spacing: Offset, options?: CreateTextureOptions): CanvasTexture
}

type QuadOrRect =
  | [
      x1: number,
      y1: number,
      x2: number,
      y2: number,
      x3: number,
      y3: number,
      x4: number,
      y4: number
    ]
  | [left: number, top: number, right: number, bottom: number]
  | [width: number, height: number]

type CornerRadius = number | DOMPoint

interface CanvasRenderingContext2D
  extends CanvasCompositing,
    CanvasDrawImage,
    CanvasDrawPath,
    CanvasFillStrokeStyles,
    CanvasFilters,
    CanvasImageData,
    CanvasImageSmoothing,
    CanvasPath,
    CanvasPathDrawingStyles,
    CanvasRect,
    CanvasShadowStyles,
    CanvasState,
    CanvasText,
    CanvasTextDrawingStyles,
    CanvasTransform,
    CanvasUserInterface {
  readonly canvas: Canvas
  fontVariant: string
  textTracking: number
  textWrap: boolean
  lineDashMarker: Path2D | null
  lineDashFit: 'move' | 'turn' | 'follow'

  get currentTransform(): DOMMatrix

  set currentTransform(matrix: DOMMatrix)

  createProjection(quad: QuadOrRect, basis?: QuadOrRect): DOMMatrix

  conicCurveTo(
    cpx: number,
    cpy: number,
    x: number,
    y: number,
    weight: number
  ): void

  roundRect(
    x: number,
    y: number,
    width: number,
    height: number,
    radii: number | CornerRadius[]
  ): void

  // getContextAttributes(): CanvasRenderingContext2DSettings;

  fillText(text: string, x: number, y: number, maxWidth?: number): void

  strokeText(text: string, x: number, y: number, maxWidth?: number): void

  measureText(text: string, maxWidth?: number): TextMetrics

  outlineText(text: string): Path2D

  reset(): void
}
