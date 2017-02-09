export default class Topic {
    id: string;
    title: string;
    proposer: string;
    votes: string[];
    currentUserIsProposer: boolean;
    currentUserHasVoted: boolean;

    constructor(id: string, title: string, proposer: string) {
        this.id = id;
        this.title = title;
        this.proposer = proposer;
    }

    get voteCount(): number {
        return this.votes.length;
    }

    isUserProposer(userId: string) {
        return this.proposer === userId; 
    }

    hasUserVoted(userId: string) {
        return this.votes.some(voteUserId => voteUserId === userId);
    }
}