const { UserInputError, AuthenticationError, withFilter } = require('apollo-server')
const { Op } = require('sequelize')

const { User, Message } = require('../../models')

module.exports = {

    Query: {
        getMessages: async (parent, { from }, { user }) => {
            try{
                if(!user) throw new AuthenticationError('Unauthenticated')
                
                const otherUser = await User.findOne({where: {username: from}})

                if(!otherUser) throw new UserInputError('User not found')
                 
                const usernames = [user.username, otherUser.username]
                const messages = await Message.findAll({
                    where: {
                        from: {[Op.in]: usernames },
                        to: {[Op.in]: usernames }
                    },
                    order: [['createdAt', 'DESC']],
                })

                return messages

            } catch(err){
                throw err
            }
        }
    },
    Mutation: {

        sendMessage: async (parent, { to, content }, { user, pubsub }) => {
            try{
                if(!user) throw new AuthenticationError('Unauthenticated')
                
                const recipient = await User.findOne({where: {username: to}})
                
                if(!recipient){
                    throw new UserInputError('User not found')
                } else if(recipient.username === user.username){
                throw new UserInputError('Cant message yourself')
            }
            
            if(content.trim() === ''){
                throw new UserInputError('Content is empty')
            }
            
            const message = await Message.create({
                from: user.username,
                to,
                content
            })
            
            pubsub.publish('NEW_MESSAGE', { newMessage: message })
            return message
            } catch(err){
                throw err
            }
        }
    },

    Subscription: {
        //get only those messages sent and received by authenticated user
        newMessage: {
            subscribe: withFilter((_, __, { pubsub, user}) => {
                if(!user) throw new AuthenticationError('Unauthenticated')
                return pubsub.asyncIterator(['NEW_MESSAGE'])
            }, ( { newMessage }, _, { user }) => {
                return newMessage.from === user.username || newMessage.to === user.username
            })
        }
    }
}
