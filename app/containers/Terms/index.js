/**
 *
 * Terms
 *
 */

import React, { memo, useState } from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import { connect } from 'react-redux';
import { Helmet } from 'react-helmet';
import { compose } from 'redux';
import SecurityTerm from '../../components/SecurityTerm/Loadable';
import AgreeTerm from '../../components/AgreeTerm/Loadable';
import RentTerm from '../../components/RentTerm/Loadable';
import WalletTerm from '../../components/WalletTerm/Loadable';
import ComplainTerm from '../../components/ComplainTerm/Loadable';
import { Container } from '@material-ui/core';
import PaperWrapper from '../../components/PaperWrapper/Loadable';
import { FormattedMessage } from 'react-intl';
import messages from './messages';

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`scrollable-auto-tabpanel-${index}`}
      aria-labelledby={`scrollable-auto-tab-${index}`}
      {...other}
    >
      {value === index && <Box p={3}>{children}</Box>}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired,
};

function a11yProps(index) {
  return {
    id: `scrollable-auto-tab-${index}`,
    'aria-controls': `scrollable-auto-tabpanel-${index}`,
  };
}

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
    width: '100%',
    backgroundColor: theme.palette.background.paper,
  },
}));

export function Terms() {
  const classes = useStyles();
  const [value, setValue] = useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  return (
    <div className="terms-wrapper">
      <Helmet>
        <title>Terms</title>
        <meta name="description" content="Description of Terms" />
      </Helmet>
      <Container maxWidth="md">
        <PaperWrapper>
          <div className={classes.root}>
            <AppBar position="static" color="default">
              <Tabs
                value={value}
                onChange={handleChange}
                indicatorColor="primary"
                textColor="primary"
                variant="scrollable"
                scrollButtons="auto"
                aria-label="scrollable auto tabs example"
              >
                <Tab label={ <FormattedMessage {...messages.PrivacyPolicy} />} {...a11yProps(0)} />
                <Tab label={ <FormattedMessage {...messages.InternalWalletUsagePolicy} />} {...a11yProps(1)} />
                <Tab label={ <FormattedMessage {...messages.RentalTerms} />} {...a11yProps(2)} />
                <Tab label={ <FormattedMessage {...messages.TermsOfAgreement} />} {...a11yProps(3)} />
                <Tab label={ <FormattedMessage {...messages.ResolveComplaints} />} {...a11yProps(4)} />
              </Tabs>
            </AppBar>
            <TabPanel value={value} index={0}>
              <SecurityTerm />
            </TabPanel>
            <TabPanel value={value} index={1}>
              <WalletTerm />
            </TabPanel>
            <TabPanel value={value} index={2}>
              <RentTerm />
            </TabPanel>
            <TabPanel value={value} index={3}>
              <AgreeTerm />
            </TabPanel>
            <TabPanel value={value} index={4}>
              <ComplainTerm />
            </TabPanel>
          </div>
        </PaperWrapper>
      </Container>
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired,
};

function mapDispatchToProps(dispatch) {
  return {
    dispatch,
  };
}

const withConnect = connect(
  null,
  mapDispatchToProps,
);

export default compose(
  withConnect,
  memo,
)(Terms);
