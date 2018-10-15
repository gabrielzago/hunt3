import React from 'react';
import { WebView } from  'react-native';

const Product = ({ navigation }) => (
	<WebView source={{ uri: navigation.state.params.product.url }} />
);

Product.navigateOptions = ({ navigation }) => ({
	title: navigation.state.params.product.title,
	desc
});

export default Product;