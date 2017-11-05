import React from 'react';
import { connect } from 'react-redux';
import { Link, withRouter } from 'react-router-dom';
import { compose } from 'redux';
import classNames from 'classnames';
import * as R from 'ramda';

import { getCategories, getActiveCategoryId } from 'selectors';

const Categories = ({categories, activeCategoryId}) => {
    console.log('activeCategoryId ', activeCategoryId);

    const getActiveState = R.propEq('id', activeCategoryId);
    const renderCategory = (category, index) =>{
        const linkClass = classNames({
            'list-group-item': true,
            'active': getActiveState(category)
        });
        return(
            <Link to={`/categories/${category.id}`} className={linkClass} key={index}>{category.name}</Link>
        )
    };

    const renderAllCategory = () => {
        const linkClass = classNames({
            'list-group-item': true,
            'active': R.isNil(activeCategoryId)
        });
        return(
            <Link to="/" className={linkClass}>All</Link>
        )
    };

    return (
        <div className="well">
            <h4>Brand</h4>
            {renderAllCategory()}
            <div className="list-group">
                {categories.map((category, index) => renderCategory(category, index))}
            </div>
        </div>
    )
};

const mapStateToProps = (state, ownProps) => ({
    categories: getCategories(state),
    activeCategoryId: getActiveCategoryId(ownProps)
});

export default compose(
    withRouter,
    connect(mapStateToProps, null)
)(Categories)