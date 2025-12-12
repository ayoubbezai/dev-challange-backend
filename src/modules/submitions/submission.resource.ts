export class SubmissionResource {
  static toResponse(sub: any) {
    return {
      id: sub.id,
      status: sub.status,
      link: sub.link,
      points: sub.points,
      createdAt: sub.createdAt,

      // User fields (flattened)
      userId: sub.userId,
      user_full_name: sub.user?.full_name || null,
      user_nick_name: sub.user?.nick_name || null,
      user_email: sub.user?.email || null,

      // Challenge fields (flattened)
      challengeId: sub.challengeId,
      challenge_title: sub.challenge?.title || null,
      challenge_subTitle: sub.challenge?.subTitle || null,
      challenge_points: sub.challenge?.points || null,
      challenge_type: sub.challenge?.type || null,
    };
  }

  static toCollection(submissions: any[]) {
    return submissions.map((s) => SubmissionResource.toResponse(s));
  }
}
