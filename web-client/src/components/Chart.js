import React, { Component } from 'react'
import { isEqual } from 'lodash'
import Chart from 'chart.js'
import PropTypes from 'prop-types'

class BaseChart extends Component {
  static propTypes = {
    labels: PropTypes.array,
    datasets: PropTypes.array,
    title: PropTypes.string,
    onClick: PropTypes.func,
    showLegend: PropTypes.bool,
    options: PropTypes.object,
    type: PropTypes.string.isRequired,
  }
  constructor(props) {
    super(props)
    this.chart = null
    this.showLegend = typeof this.props.showLegend !== 'undefined' ? this.props.showLegend : false
    this.domId = this.props.type + '-chart-' + Math.floor(Math.random() * 100000000)
  }

  render() {
    return <canvas id={this.domId} />
  }

  componentDidMount() {
    this.renderChart()
  }

  componentDidUpdate() {
    this.renderChart()
  }

  shouldComponentUpdate(nextProps) {
    if (this.props.datasets.length !== nextProps.datasets.length) return true
    if (!isEqual(this.props.datasets, nextProps.datasets) || !isEqual(this.props.labels, nextProps.labels)) return true
    return false
  }

  initChart() {
    this.chart = new Chart(document.getElementById(this.domId), {
      type: this.props.type,
      options: {
        responsive: true,
        maintainAspectRatio: false,
        title: {
          display: true,
          text: this.props.title,
        },
        legend: {
          display: this.showLegend,
        },
        onClick: this.props.onClick,
        ...this.props.options,
      },
      data: {
        labels: this.props.labels,
        datasets: this.props.datasets,
      },
    })
  }

  renderChart() {
    if (this.chart) this.updateChart()
    else this.initChart()
  }

  updateChart() {
    this.chart.config.data.labels = this.props.labels
    this.chart.config.data.datasets = this.props.datasets
    this.chart.update()
  }
}

export default BaseChart
