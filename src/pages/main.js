import React, { Component } from 'react';

import { View, Text, FlatList, TouchableOpacity, StyleSheet } from 'react-native';

import api from '../services/api';

export default class Main  extends Component {
	static = navigationOptions = {
		title: "JsHunt"
	};

	componentDiMount() {
		this.loadProduct();
	}

	state = {
		productInfo: {},
		docs: [],
		page: 1
	}

	loadProduct = async (page = 1) => {
		const response = await api.get(`/products?page=${page}`);

		const { docs } = response.data;

		console.log( docs );

		this.setState({ 
			docs: [this.stata.docs, docs], 
			productInfo,
			page
		});
	};

	loadMore = () => {
		const { page, productInfo } = this.state;

		if(page == productInfo.pages) return;

		const pageNumber = page + 1;

		this.loadProduct( pageNumber );
	};

	renderItem = ({ item }) => (
		<View style={style.productContainer}>
			<Text style={style.productTitle}>{item.title}</Text>
			<Text style={style.productTitle}>{item.title}</Text>
			<Text style={style.productDescription}>{item.description}</Text>
			<TouchableOpacity 
				style={style.productButton} 
				onPress={() => {
					this.props.navigation.navigate("Product", { product: item });
				}}
			>
				<Text style={style.productButtonText}>Acessar</Text>
			</TouchableOpacity>
		</View>
	);

	render(){
		return(
			<View style={style.container}>
				<Text>Produtos</Text>
				<FlatList 
					contentContainerStyle={style.list}
					data={this.state.docs}
					keyExtractor={item => item._id}
					renderItem={this.renderItem}
					onEndReached={this.loadMore}
					onEndReachedThreshold={0.1}
				/> 
			</View>
		);
	}
}

const style = StyleSheet.create({
	container: {
		backgroundColor: '#fafafa',
		flex: 1
	},

	list: {
		padding: 20
	},

	productContainer: {
		backgroundColor: "#fff",
		borderWidth: 1,
		borderColor: '#DDD', 
		borderRadius: 5,
		padding: 20,
		marginBottom: 20
	},

	productTitle: {
		fontSize: 18,
		fontWeight: 'bold',
		color: '#333'
	},

	productDescription: {
		fontSize: 16,
		color: '#999',
		marginTop: 5,
		lineHeight: 24
	},

	productButton: {
		marginTop: 10,
		height: 42,
		borderRadius: 5,
		borderWidth: 2,
		borderColor: '#DA5527',
		backgroundColor: 'transparent',
		justifyContent: 'center',
		alignItems: 'center',
		marginTop: 10
	},

	productButtonText: {
		fontSize: 16,
		color: '#DA5527',
		fontWeight: 'bold'
	}
});