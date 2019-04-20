import React from 'react';
import { connect } from 'react-redux';
import { withStyles } from '@material-ui/core/styles';
import Chip from '@material-ui/core/Chip';
import TagFacesIcon from '@material-ui/icons/TagFaces';
import {
  getActiveRepo, tokenSelector, userSelector, ownersSelector, usernameSelector,
} from '../../selectors/settings';

const styles = theme => ({
  display: 'flex',
  justifyContent: 'center',
  flexWrap: 'wrap',
});

class OwnersChips extends React.Component {
  handleDelete = owner => () => {
    const { actions } = this.props;
    actions.removeOwner(owner.login);
  };

  render() {
    const { classes, owners = [] } = this.props;

    return owners.length ? (
      <div className={classes.root}>
        {owners.map((owner) => {
          const icon = <TagFacesIcon />;

          return owner && (
            <Chip
              key={owner.login}
              icon={icon}
              label={owner.login}
              onDelete={this.handleDelete(owner)}
              className={classes.chip}
            />
          );
        })}
      </div>
    ) : <div />;
  }
}

const mapStateToProps = state => ({
});

export default connect(
  mapStateToProps,
)(withStyles(styles)(OwnersChips));
