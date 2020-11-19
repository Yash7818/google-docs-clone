import React from "react"
import { cx,css } from '@emotion/css'

export const Button = React.forwardRef(
    (
      {
        className,
        active,
        reversed,
        ...props
      }
    ) => (
      <span
        {...props}
        className={cx(
          className,
          css`
            cursor: pointer;
            color: ${reversed
              ? active
                ? 'white'
                : '#aaa'
              : active
              ? 'black'
              : '#ccc'};
          `
        )}
      />
    )
  )

  export const Icon = React.forwardRef(
    (
      { className, ...props }
    ) => (
      <span
        {...props}
        className={cx(
          'material-icons',
          className,
          css`
            font-size: 18px;
            vertical-align: text-bottom;
          `
        )}
      />
    )
  )

  export const Menu = React.forwardRef(
    (
      { className, ...props }
    ) => (
      <div
        {...props}
        className={cx(
          className,
          css`
            & > * {
              display: inline-block;
            }
            & > * + * {
              margin-left: 15px;
            }
          `
        )}
      />
    )
  )

  export const Toolbar = React.forwardRef(
    (
      { className, ...props }
    ) => (
      <Menu
        {...props}
        className={cx(
          className,
          css`
            position: relative;
            padding: 1px 18px 17px;
            margin: 0 -20px;
            border-bottom: 2px solid #eee;
            margin-bottom: 30px;
            margin-top: 10px;
          `
        )}
      />
    )
  )