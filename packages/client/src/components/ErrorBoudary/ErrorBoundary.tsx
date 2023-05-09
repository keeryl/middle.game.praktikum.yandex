import { Component, ErrorInfo, ReactNode } from 'react'
import styles from './errorBoundary.module.css'

interface Props {
  children: ReactNode
}

interface State {
  hasError: boolean
}

export class ErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false,
  }

  public static getDerivedStateFromError(_: Error): State {
    return { hasError: true }
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('Uncaught error:', error, errorInfo)
  }

  public render() {
    if (this.state.hasError) {
      return (
        <main className={styles.main}>
          <h1 className={styles.title}>Сорян, произошла ошибка</h1>
        </main>
      )
    }

    return this.props.children
  }
}
