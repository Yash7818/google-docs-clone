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
                : '#ffff'
              : active
              ? '#000'
              : '#ffff'};
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
            font-size: 1.3em;
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
           background-image: linear-gradient(to right, #4facfe 0%, #00f2fe 100%);           padding:1em 2.5em;
            margin: 0 -20px;
            border-bottom: 2px solid #eee;
            margin-bottom: 1.4em;
            &:hover {
              transform: translate(1.2);
            }
          `
        )}
      />
    )
  )