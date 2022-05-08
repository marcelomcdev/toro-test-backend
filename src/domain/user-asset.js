module.exports = () => class {
    constructor(id = null, assetId, userId) {
        this.id= id
        this.assetId = assetId
        this.userId = userId
    }
}