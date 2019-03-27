/**
 *    SPDX-License-Identifier: Apache-2.0
 */

import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import {
  PieChart, Pie, Tooltip, Legend,
} from 'recharts';
import { transactionByOrgType } from '../types';

const colors = ['#bd162f', '#ec3549', '#fb3d4b', '#f09ba4'];

const styles = (theme) => {
  const { type } = theme.palette;
  const dark = type === 'dark';
  return {
    container: {
      paddingLeft: '10%',
      '& .recharts-layer': {
        fill: dark ? 'rgb(42, 173, 230) !important' : '#D92B43 !important',
      },
      '& .recharts-scatter-line': {
        stroke: dark ? '#ffc145 !important' : '#D92B43 !important',
        strokeWidth: '2 !important',
      },
      '& .recharts-text': {
        fill: dark ? '#ffffff !important' : undefined,
      },
      '& .recharts-cartesian-axis-line': {
        stroke: dark ? '#ffffff' : undefined,
      },
    },
    chart: {
      top: -30,
    },
  };
};

export class OrgPieChart extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [
        { value: 3, name: 'OrdererMSP', fill: '#222222' },
        { value: 40, name: 'Org1MSP', fill: '#fb3d4b' },
        { value: 23, name: 'Org2MSP', fill: '#f09ba4' },
      ],
    };
  }

  componentDidMount() {
    const { transactionByOrg } = this.props;
    this.orgDataSetup(transactionByOrg);
  }

  componentWillReceiveProps(nextProps) {
    const { transactionByOrg } = this.props;
    if (nextProps.transactionByOrg !== transactionByOrg) {
      this.orgDataSetup(nextProps.transactionByOrg);
    }
  }

  orgDataSetup = (orgData) => {
    const temp = [];
    let index = 0;
    orgData.forEach((element) => {
      temp.push({
        value: parseInt(element.count, 10),
        name: element.creator_msp_id,
        fill: colors[index],
      });
      index += 1;
    });
    this.setState({ data: temp });
  };

  render() {
    const { data } = this.state;
    const { classes } = this.props;
    return (
      <div className={classes.container}>
        <PieChart width={485} height={290} className={classes.chart}>
          <Legend align="right" height={10} />
          <Pie
            data={data}
            dataKey="value"
            nameKey="name"
            cx="50%"
            cy="50%"
            outerRadius={90}
            label
            fill="fill"
          />
          <Tooltip />
        </PieChart>
      </div>
    );
  }
}

OrgPieChart.propTypes = {
  transactionByOrg: transactionByOrgType.isRequired,
};

export default withStyles(styles)(OrgPieChart);
