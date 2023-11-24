import React from 'react'
import PropTypes from 'prop-types'
import Tooltip from '@ucloud-fe/react-components/lib/components/Tooltip'
import { isString } from 'lodash'

/**
 * DateTime
 * @description 展示格式化的日期时间，格式为 yyyy-mm-dd hh:mm:ss
 */
const DateTime = ({ timestamp, unit, showTime, ...others }) => {
  const paddingWithZero = (str) => ('0' + str).slice(-2)

  const getTs = (_timestamp, _unit) => {
    const ts = isString(_timestamp) ? parseInt(_timestamp) : _timestamp
    if (_unit === 's') {
      return ts * 1000
    }

    return ts
  }

  const date = new Date(getTs(timestamp, unit))

  const getDate = () =>
    `${date.getFullYear()}-${paddingWithZero(date.getMonth() + 1)}-${paddingWithZero(date.getDate())}`

  const getTime = () =>
    `${paddingWithZero(date.getHours())}:${paddingWithZero(date.getMinutes())}:${paddingWithZero(date.getSeconds())}`

  const fullDate = `${getDate()} ${getTime()}`

  return showTime ? (
    <span {...others}>{fullDate}</span>
  ) : (
    <Tooltip popup={fullDate} defaultVisible={false}>
      <span {...others}>{getDate()}</span>
    </Tooltip>
  )
}

DateTime.propTypes = {
  /**
   * 时间戳（毫秒）
   */
  timestamp: PropTypes.oneOfType([PropTypes.number, PropTypes.string]).isRequired,
  /**
   * 单位，默认为毫秒
   */
  unit: PropTypes.oneOf(['ms', 's']),
  /**
   * 是否展示时间部分
   */
  showTime: PropTypes.bool,
  /** @ignore */
  className: PropTypes.string,
}

DateTime.defaultProps = {
  unit: 'ms',
  showTime: false,
}

export default DateTime
